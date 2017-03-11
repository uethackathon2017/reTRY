import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image
} from 'react-native';
import Carousel from 'react-native-carousel';
import {Card, Container} from 'native-base';
import styles from './styles';
import {getAllWords} from '../../reducers';
import {connect} from 'react-redux';
import CountDownText from './CountDownText';

const cardWithNoImage = (word) => (
    <Card
        style={StyleSheet.flatten(styles.card)}
        key={word._id}
    >
        <View style={styles.header}>
            <Text style={styles.word}>{word.name}</Text>
            <Text style={styles.pronounce}>/{word.pronunciation[0]}/</Text>
        </View>
        <View style={styles.body}>
            {
                word.def.map((def, index) => {
                    return (
                        <View style={styles.definition}
                              key={word._id+"-"+index}
                        >
                            <Text style={styles.wordType}>-- {def.pos} --</Text>
                            <Text style={styles.meaning}>{def.definition}</Text>
                        </View>
                    )
                })
            }
        </View>
    </Card>
);

const cardWithImage = (word) => (
    <Card style={StyleSheet.flatten(styles.card)}
          key={word._id}
    >
        <View style={styles.smallHeader}>
            <Text style={styles.darkWord}>{word.name}</Text>
            <Text style={styles.darkPronounce}>/{word.pronunciation[0]}/</Text>
        </View>
        <View style={styles.userAvatarContainer}>
            <Image
                style={styles.headerImage}
                source={{ uri: word.image }}
            >
            </Image>
        </View>
        <View style={styles.body}>
            {
                word.def.map((def, index) => {
                    return (
                        <View style={styles.definition}
                              key={word._id+"-"+index}
                        >
                            <Text style={styles.wordType}>-- {def.pos} --</Text>
                            <Text style={styles.meaning}>{def.definition}</Text>
                        </View>
                    )
                })
            }
        </View>
    </Card>
);

const wordCard = (word) => {
    if (!word.image || word.image == '') {
        return cardWithNoImage(word);
    } else {
        return cardWithImage(word);
    }
};

class NewWords extends Component {
    render() {
        const {words} = this.props;

        return (
            <Container style={StyleSheet.flatten(styles.container)}>
                <View style={styles.instructionContainer}>
                    <Text style={styles.instructionText}>Take a quick look and remember these words</Text>
                </View>
                <Carousel
                    style={styles.carousel}
                    animate={false} // Enable carousel autoplay
                    delay={500}
                    hideIndicators={true}
                >

                    {words.map((word) => {
                        return wordCard(word);
                    })}

                </Carousel>
                <View style={styles.countDownContainer}>
                    <CountDownText/>
                </View>
            </Container >
        );
    }
}

const mapStateToProps = (state) => ({
    words: getAllWords(state)
});

export default connect(mapStateToProps)(NewWords);
