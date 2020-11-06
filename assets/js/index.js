"use strict";
const quizsData = [
    {
        question: '1 + 1 = ? ',
        a: 2,
        b: 3,
        c: 4,
        d: 5,
        correct: "c"
    },
    {
        question: 'What is the most used programing languge in 2019 ?',
        a: 'Java',
        b: 'C',
        c: 'Js',
        d: 'Python',
        correct: "c"
    },
    {
        question: 'What does HTML stand for',
        a: 'Hypertext Markup Language',
        b: 'Language Programing',
        c: 'IDE',
        d: 'Framework Front-end',
        correct: "a"
    }
];
const question = document.querySelector('#question');
const ansA = document.querySelector('.label_a');
const ansB = document.querySelector('.label_b');
const ansC = document.querySelector('.label_c');
const ansD = document.querySelector('.label_d');
const submit = document.querySelector('#submit');
const totalQuesElm = document.querySelector('#total');
const currQuesElm = document.querySelector('#current');
const listResult = document.querySelector('#listresult');
const close = document.querySelector('#close');
const err = document.querySelector('#err');
const modal = document.querySelector('.quizcontainer__modal');
let currentQues = 0;
let answer = undefined;
let arrAns = [];

function quiz(){
    if(currentQues == quizsData.length) {
        return true;
    }
    const currentData = quizsData[currentQues];
    animationText(question, currentData.question, 400);
    animationText(ansA, currentData.a , 400);
    animationText(ansB, currentData.b , 400);
    animationText(ansC, currentData.c , 400);
    animationText(ansD, currentData.d , 400);
    currQuesElm.innerText = currentQues + 1;
    return false;
};

function getSelect() {
    const rightAns = document.querySelector('input[name=answer]:checked');
    if(!rightAns) {
        return false;
    }
    return rightAns;
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
        isAns.checked = false;
        arrAns.push(isAns.id);
        currentQues++;
        const isFinal = quiz();
        if(isFinal) {
            for(let i = 0;i < quizsData.length;i++) {
                if(quizsData[i].correct == arrAns[i]) {
                    listResult.insertAdjacentHTML("beforeEnd", `<li><p>: ${quizsData[i].correct}<img src="https://lh3.googleusercontent.com/proxy/8-KpWdWv3m0GiAMExPHg9xbQVFkNXgmJX3icF3nnyhzU4A0v9c_4PD2Wz3V-FYQHY0muKglSrHktoeLi0YHjulX1xsZbZdo" alt="checked"></p></li>`);
                } else {
                    listResult.insertAdjacentHTML("beforeEnd", `
                    <li><p>: ${arrAns[i]}<img src="https://icon-library.com/images/x-png-icon/x-png-icon-8.jpg" alt="falsechecked"> (${quizsData[i].correct})</p></li>`);
                }
            }
            modal.classList.add('show');
        }
    }
        
});

close.addEventListener('click', function(){
    currentQues = 0;
    modal.classList.remove('show');
    arrAns = [];
    quiz();
});

totalQuesElm.innerText = quizsData.length;
quiz();

