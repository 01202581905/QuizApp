"use strict";
const quizsData = [
    {
        question: '1 + 1 = ? ',
        a: 2,
        b: 3,
        c: 4,
        d: 5,
        correct: c
    },
    {
        question: 'What is the most used programing languge in 2019 ?',
        a: 'Java',
        b: 'C',
        c: 'Js',
        d: 'Python',
        correct: c
    },
    {
        question: 'What does HTML stand for',
        a: 'Hypertext Markup Language',
        b: 'Language Programing',
        c: 'IDE',
        d: 'Framework Front-end',
        correct: a
    }
];
const question = document.querySelector('#question');
const ansA = document.querySelector('.label_a');
const ansB = document.querySelector('.label_b');
const ansC = document.querySelector('.label_c');
const ansD = document.querySelector('.label_d');
const submit = document.querySelector('#submit');
const err = document.querySelector('#err');
const listAns = document.querySelectorAll('.answer');
const totalQuesElm = document.querySelector('#total');
const currQuesElm = document.querySelector('#current');
let currentQues = 0;
let answer = undefined;

function quiz(){
    if(currentQues == quizsData.length) 
        currentQues = 0;
    const currentData = quizsData[currentQues];
    animationText(question, currentData.question, 400);
    animationText(ansA, currentData.a , 400);
    animationText(ansB, currentData.b , 400);
    animationText(ansC, currentData.c , 400);
    animationText(ansD, currentData.d , 400);
    currQuesElm.innerText = currentQues + 1;
};

function getSelect() {
    const rightAns = document.querySelector('input[name=answer]:checked');
    if(!rightAns) {
        return false;
    }
    return true;
};

function animationText(elem, value, duration) {
    elem.style.opacity = 0;
    setTimeout(function(){
        elem.innerText = value;
        elem.style.opacity = 1;
    }, duration);
};

submit.addEventListener('click', function(event){
    const isAns = getSelect();
    if (!isAns) {
        err.classList.add('showerr');
        event.preventDefault();
    } else {
        err.classList.remove('showerr');
        listAns.forEach(item => {
            item.checked = false;
        });
        currentQues++;
        quiz();
    }
        
});
totalQuesElm.innerText = quizsData.length;
quiz();

