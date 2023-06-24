const game=document.getElementById('game');
const scoreDisplay=document.getElementById('score');

const jeopardyCategories=[
    {
        genre:'WHO',
        questions:[
            {
                question:"Who is the author of Harry Potter",
                answers:["Jk Rowling","JRR Tokein"],
                correct:"JK Rowling",
                level:"easy",

            },
            {
                  question:"Who was born on KRypton",
                  answers:["Aquaman","superman"],
                  correct:"Superman",
                  level:"medium",
            },
            {
                question:"WHo designed the first car:?",
                answers:["Karl Benz","Henry Ford"],
                correct:"Karl Benz",
                level:"hard",
            },
        ],
    },
    {
        genre:'WHERE',
        questions:[
            {
                question:"Where is Buckingham Palace?",
                answers:["Richmond","London"],
                correct:"London",
                level:"easy",
            },
            {
                question:"Where is the Colossium",
                answers:["Rome","Milan"],
                correct:"Rome",
                level:"medium",
            },
            {
                question:"Where is MOunt Kilamanjaro?",
                answers:["Zimbawe","Tanazania"],
                correct:"Zimbawe",
                level:"hard",
            },
        ],
    },
    {
        genre:"WHEN",
        questions:[
            {
                question:"When is Christmas?",
                answers:["30th December","25th December"],
                correct:"25th December",
                level:"easy",
            },
            {
                question:"When was JKF Shot",
                answers:['1963','1961'],
                correct:'1963',
                level:'hard',
            },
            {
                question:'when was WW2',
                answers:['1932','1941'],
                correct:'1941',
                level:'medium',
            }
        ],
    },
    {
        genre:"WHAT",
        questions:[
            {
                question:"WHat is the capital of Saudi Arabia",
                answers:['JEddah','Riyadh'],
                correct:'Riyadh',
                level:'hard',
            },
            {
                question:"What do Koalas eat",
                answers:['Straw','Eucalypt'],
                correct:'Eucalypt',
                level:'medium',
            },
            {
                question:"What is a kg short for?",
                answers:['Kilojoule','Kilogram'],
                correct:'Kilogram',
                level:'easy',
            },
        ],
    },
    {
        genre:"HOW MANY",
        questions:[
            {
                question:'How many players are there in a football team',
                answers:['15','11'],
                correct:'11',
                level:'easy',
            },
            {
                question:"How many seconds are there in an hour",
                answers:['3600','3400'],
                correct:'3600',
                level:'medium',
            },
            {
                question:'How many people are there in China',
                answers:['1.1 bil','1.4 bil'],
                correct:'1.4 bil',
                level:'hard',
            },
        ],
    },

]

let score=0;

function addCategory(category)
{
   const column=document.createElement('div');
   column.classList.add('genre-column');

   const title=document.createElement('div');
   title.classList.add('genre-title');
   title.innerHTML=category.genre;
   column.appendChild(title);
   game.append(column);

   category.questions.forEach(question=>{
    const card=document.createElement('div');
    card.classList.add('card');
    column.append(card);
    if(question.level==='easy')
    {
        card.innerHTML='100';
    }
    else if(question.level==='medium')
    {
        card.innerHTML='200';
    }
    else card.innerHTML='300';
 
    card.setAttribute('data-question',question.question);
    card.setAttribute('data-answer-1',question.answers[0]);
    card.setAttribute('data-answer-2',question.answers[1]);
    card.setAttribute('data-value',card.innerHTML);
    card.setAttribute('data-correct',question.correct);
 
    card.addEventListener('click',flipCard);
   })



}

jeopardyCategories.forEach(category => addCategory(category))

function flipCard(){
    this.innerHTML='';
    this.style.fontSize="15px";
    this.style.lineHeight='30px';
    const textDisplay=document.createElement('div');
    textDisplay.classList.add('card-text');
    textDisplay.innerHTML=this.getAttribute('data-question')
    const firstbutton=document.createElement('button');
    const secondbutton=document.createElement('button');
    firstbutton.classList.add('card-button-1');
    secondbutton.classList.add('card-button-2');
    firstbutton.innerHTML=this.getAttribute('data-answer-1');
    secondbutton.innerHTML=this.getAttribute('data-answer-2');
    firstbutton.style.backgroundColor="pink";
    secondbutton.style.backgroundColor="red";
    this.append(textDisplay,firstbutton,secondbutton);

    firstbutton.addEventListener('click',getResult);
    secondbutton.addEventListener('click',getResult);

    const allCards=Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card => card.removeEventListener('click',flipCard));
}

function getResult(){
    const allCards=Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card => card.addEventListener('click',flipCard));
    const cardofButton=this.parentElement;
    if(cardofButton.getAttribute('data-correct')==this.innerHTML)
    {
        score=score+parseInt(cardofButton.getAttribute('data-value'));
        scoreDisplay.innerHTML=score;
        cardofButton.classList.add('correct-answer');

        setTimeout(()=>{
            while(cardofButton.firstChild)
            {
                cardofButton.removeChild(cardofButton.firstChild);
            }
            cardofButton.innerHTML=cardofButton.getAttribute('data-value');
        },100)
    }
    else{
        cardofButton.classList.add('wrong-answer');
        setTimeout(()=>{
            while(cardofButton.firstChild)
            {
                cardofButton.removeChild(cardofButton.firstChild);
            }
            cardofButton.innerHTML=0;
        },100);


    }
    cardofButton.removeEventListener('click',flipCard);

}