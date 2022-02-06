import React from 'react';
import {Input} from "../../ui/input";
import styles from './case-converter.module.css';
import {Button} from "../../ui/button";
import {Select} from "../../ui/select";

const ABC = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

const indeclinableNouns = ['какао', 'манго', 'кино', 'метро', 'бюро', 'домино', 'трюмо', 'пальто', 'танго', 'бунгало',
    'вето', 'авокадо', 'дело', 'сабо', 'бордо', 'евро', 'эсперанто', 'кашпо', 'депо', 'пианино', 'кенгуру', 'шоу',
    'рагу', 'какаду', 'зебу', 'фрау', 'конферансье', 'шимпанзе', 'колье', 'резюме', 'кашне', 'атташе', 'пенсне',
    'протеже', 'суфле', 'драже', 'шоссе', 'пюре', 'купе', 'фойе', 'коммюнике', 'кофе', 'кафе', 'жалюзи', 'шасси',
    'такси', 'алиби', 'киви', 'конфетти', 'жюри', 'иваси', 'пенальти', 'рефери', 'регби', 'кольраби', 'спагетти',
    'бренди', 'виски', 'травести', 'пони', 'каноэ', 'алоэ', 'нэцкэ', 'каратэ', 'каланхоэ', 'меню', 'авеню', 'дежавю',
    'инженю', 'барбекю', 'парвеню', 'интервью', 'боа', 'бра', 'фейхоа', 'буржуа', 'амплуа', 'мисс', 'миссис', 'токио',
    'осло', 'колорадо', 'сочи', 'баку', 'борнео', 'хельсинки', 'капри', 'миссури', 'миссисипи', 'табло', 'ателье', 'радио'];

const consonants = 'бвгджзклмнпрстфхцчшщ';

const masculineWords = ['Голубь', 'Лебедь', 'Дождь', 'Гвоздь', 'Гость', 'Путь'];

const neuterWords = ['Бремя', 'Вымя', 'Темя', 'Пламя', 'Стремя', 'Время', 'Знамя', 'Имя', 'Семя', 'Племя'];

class CaseConverter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'inputWord': '',
            'nominativeCase': {value: ''},
            'genitiveCase': {value: ''},
            'dativeCase': {value: ''},
            'accusativeCase': {value: ''},
            'instrumentalCase': {value: ''},
            'prepositionalCase': {value: ''},
        };
        this.handleOnInput = this.handleOnInput.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    calcDeclension(word) {
        if (word.length < 2) return;
        let wordLowerCase = word.trim().toLowerCase();
        let newWord = wordLowerCase.slice(0, 1).toUpperCase() + wordLowerCase.slice(1);
        let lastChar = newWord.slice(-1);
        let withoutLastChar = newWord.slice(0, -1);

        if (indeclinableNouns.includes(wordLowerCase)) {

            this.calcWordCases('nothing', newWord)

        } else if (~'ая'.indexOf(lastChar) && newWord.slice(-2) !== 'мя' && newWord !== 'Дитя') {

            this.calcWordCases('first', newWord, withoutLastChar, lastChar)

        } else if ((newWord === 'Дитя' || ~'оей'.indexOf(lastChar) || ~consonants.indexOf(lastChar) ||
            (newWord.slice(-4) === 'тель') || (newWord.slice(-3) === 'арь') || masculineWords.includes(newWord) ||
            neuterWords.includes(newWord)) && !((newWord.slice(-2) === 'ть') && newWord !== 'Гость' && newWord !== 'Путь')) {

            this.calcWordCases('second', newWord, withoutLastChar, lastChar)

        } else if (~'чьжьшьщь'.indexOf(newWord.slice(-2)) || (['бь', 'вь', 'дь', 'зь', 'сь', 'ть'].includes(newWord.slice(-2)) &&
            !(masculineWords.includes(newWord)))) {

            this.calcWordCases('third', newWord, withoutLastChar, lastChar)

        } else {
            this.calcWordCases('nothing', newWord)
        }
    }

    calcWordCases(res, word, withoutLastChar, lastChar) {
        if (res === 'nothing') {
            let valWord = {value: word};
            this.setState({
                'nominativeCase': valWord,
                'genitiveCase': valWord,
                'dativeCase': valWord,
                'accusativeCase': valWord,
                'instrumentalCase': valWord,
                'prepositionalCase': valWord,
            });
        } else if (res === 'first') {
            let datPrepCases = {value: withoutLastChar + ((word.slice(-2) === 'ия') ? 'и' : 'е')};
            let genAccInsCases = (end1, end2) => ({value: withoutLastChar + ((lastChar === 'я') ? end1 : end2)});

            this.setState({
                'nominativeCase': {value: word},
                'genitiveCase': genAccInsCases('и', 'ы'),
                'dativeCase': datPrepCases,
                'accusativeCase': genAccInsCases('ю', 'у'),
                'instrumentalCase': genAccInsCases('ей', 'ой'),
                'prepositionalCase': datPrepCases,
            });
        } else if (res === 'second') {
            let allCases = (end1, end2) => ({value: withoutLastChar + ((lastChar === 'о') ? end1 : end2)});

            this.setState({
                'nominativeCase': {value: word},
                'genitiveCase': (word === 'Дитя') ? {value: word + 'ти'} : (word === 'Путь') ? {value: withoutLastChar + 'и'} :
                    (word.slice(-2) === 'мя') ? {value: withoutLastChar + 'ени'} : (~'ое'.indexOf(lastChar)) ?
                        allCases('а', 'я') : (~'йь'.indexOf(lastChar)) ? {value: withoutLastChar + 'я'} :
                            (~consonants.indexOf(lastChar)) ? {value: word + 'а'} : {value: word},

                'dativeCase': (word === 'Дитя') ? {value: word + 'ти'} : (word === 'Путь') ? {value: withoutLastChar + 'и'} :
                    (word.slice(-2) === 'мя') ? {value: withoutLastChar + 'ени'} : (~'ое'.indexOf(lastChar)) ?
                        allCases('у', 'ю') : (~'йь'.indexOf(lastChar)) ? {value: withoutLastChar + 'ю'} :
                            (~consonants.indexOf(lastChar)) ? {value: word + 'у'} : {value: word},

                'accusativeCase': (word.slice(-2) === 'мя' || ~consonants.indexOf(lastChar) || word === 'Путь' || word === 'Дитя') ?
                    {value: word} : (~'ое'.indexOf(lastChar)) ? {value: word} : (~'йь'.indexOf(lastChar)) ?
                        {value: withoutLastChar + 'я'} : {value: word},

                'instrumentalCase': (word === 'Дитя') ? {value: word + 'тей'} : (word === 'Путь' || ~'йь'.indexOf(lastChar)) ?
                    {value: withoutLastChar + 'ем'} : (word.slice(-2) === 'мя') ? {value: withoutLastChar + 'енем'} :
                        (~'ое'.indexOf(lastChar)) ? allCases('ом', 'ем') : (~consonants.indexOf(lastChar)) ?
                            {value: word + 'ом'} : {value: word},

                'prepositionalCase': (word === 'Дитя') ? {value: word + 'ти'} : (word === 'Путь' || word.slice(-2) === 'ие') ?
                    {value: withoutLastChar + 'и'} : (word.slice(-2) === 'мя') ? {value: withoutLastChar + 'ени'} :
                        (~'ое'.indexOf(lastChar) && word.slice(-2) !== 'ие') ? allCases('е', 'е') :
                            (~'йь'.indexOf(lastChar)) ? {value: withoutLastChar + 'е'} : (~consonants.indexOf(lastChar)) ?
                                {value: word + 'е'} : {value: word},
            });
        } else if (res === 'third') {

            this.setState({
                'nominativeCase': {value: word},
                'genitiveCase': {value: withoutLastChar + 'и'},
                'dativeCase': {value: withoutLastChar + 'и'},
                'accusativeCase': {value: word},
                'instrumentalCase': {value: word + 'ю'},
                'prepositionalCase': {value: withoutLastChar + 'и'},
            });
        }
    }


    handleOnInput(e) {
        let abcUpperCase = ABC.toUpperCase();
        let val = e.target.value;
        if ((~ABC.indexOf(val.slice(-1)) || ~abcUpperCase.indexOf(val.slice(-1))) && val.length <= 24) {
            this.setState({'inputWord': val})
        }
    }

    handleOnSubmit(e) {
        e.preventDefault();
        this.calcDeclension(this.state.inputWord)
    }

    render() {
        return (
            <form className={styles['root']} onSubmit={this.handleOnSubmit}>
                <h1 className={styles['title']}>Склонение по падежам</h1>
                <div className={styles['input']}>
                    <Input type="text"
                           value={this.state.inputWord}
                           placeholder="Введите существительное длиной 2 и более символов"
                           onChange={this.handleOnInput}/>
                </div>
                <div className={styles['options']}>
                    <Select name="nominativeCase"
                            id="nominative"
                            htmlFor="nominative"
                            type="text"
                            value={this.state["nominativeCase"].value}
                    >
                        Именительный (Кто? Что?)
                    </Select>
                    <Select name="genitiveCase"
                            id="genitive"
                            htmlFor="genitive"
                            type="text"
                            value={this.state["genitiveCase"].value}
                    >
                        Родительный (Кого? Чего?)
                    </Select>
                    <Select name="dativeCase"
                            id="dative"
                            htmlFor="dative"
                            type="text"
                            value={this.state["dativeCase"].value}
                    >
                        Дательный (Кому? Чему?)
                    </Select>
                    <Select name="accusativeCase"
                            id="accusative"
                            htmlFor="accusative"
                            type="text"
                            value={this.state["accusativeCase"].value}
                    >
                        Винительный (Кого? Что?)
                    </Select>
                    <Select name="instrumentalCase"
                            id="instrumental"
                            htmlFor="instrumental"
                            type="text"
                            value={this.state["instrumentalCase"].value}
                    >
                        Творительный (Кем? Чем?)
                    </Select>
                    <Select name="prepositionalCase"
                            id="prepositional"
                            htmlFor="prepositional"
                            type="text"
                            value={this.state["prepositionalCase"].value}
                    >
                        Предложный (О ком? О чём?)
                    </Select>
                </div>
                <Button type="submit">
                    выполнить
                </Button>
            </form>
        )
    }

}

export {CaseConverter}