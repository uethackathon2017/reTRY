import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import Carousel from 'react-native-carousel';
import { Card, Container } from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import styles from './styles';


const cardWithNoImage = () => (
    <Card style={StyleSheet.flatten(styles.card)}>
        <View style={styles.header}>
            <Text style={styles.word}>Fuck</Text>
            <Text style={styles.pronounce}>/fʌk/</Text>
        </View>
        <View style={styles.body}>
            <View style={styles.definition}>
                <Text style={styles.wordType}>- noun -</Text>
                <Text style={styles.meaning}>Giao cấu, bạn tình. Bla bla bla bla bla bla</Text>
            </View>
        </View>
    </Card>
);

const cardWithImage = () => (
    <Card style={StyleSheet.flatten(styles.card)}>
        <View style={styles.smallHeader}>
            <Text style={styles.darkWord}>Fuck</Text>
            <Text style={styles.darkPronounce}>/fʌk/</Text>
        </View>
        <View style={styles.userAvatarContainer}>
            <CacheableImage
                style={styles.headerImage}
                source={{ uri: "http://knowledge-commons.com/static/assets/images/avatar.png" }}
            >
            </CacheableImage>
        </View>

        <View style={styles.body}>
            <View style={styles.definition}>
                <Text style={styles.wordType}>- noun -</Text>
                <Text style={styles.meaning}>Sự giao cấu, bạn tình. Bla bla bla bla bla bla</Text>
            </View>
            <View style={styles.definition}>
                <Text style={styles.wordType}>- verb -</Text>
                <Text style={styles.meaning}>Chịch. Bla bla bla bla bla bla</Text>
            </View>
            <View style={styles.definition}>
                <Text style={styles.wordType}>- verb -</Text>
                <Text style={styles.meaning}>Chịch. Bla bla bla bla bla bla</Text>
            </View>
        </View>
    </Card>
);

export default class NewWords extends Component {
    render() {
        return (
            <Container style={StyleSheet.flatten(styles.container)}>
                <View style={styles.instructionContainer}>
                    <Text style={styles.instructionText}>Take a quick look and remember these words</Text>
                </View>
                <Carousel
                    style={styles.carousel}
                    animate={false} // Enable carousel autoplay
                    delay={500}
                    indicatorAtBottom={true}
                    indicatorSize={30}
                    inactiveIndicatorColor="#999999"
                    indicatorColor="#FFFFFF"
                    indicatorOffset={0}
                >

                    {cardWithImage()}

                    {cardWithNoImage()}

                    {cardWithImage()}

                </Carousel>
                <View style={styles.countDownContainer}>
                    <Text style={styles.countDown}>Game starts in...</Text>
                </View>
            </Container >
        );
    }
}