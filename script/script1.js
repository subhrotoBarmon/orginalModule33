// synonym
let all=arr=>{
    let err= arr.map(each =>`<li class="synonym-style">${each}</li>`);
    // err.classList.add("btn-nav");
     return err.join(" ");  
}
// loading
let loading=(lesson)=>{
      if(lesson===true){
        document.getElementById("hide").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
      }
      else{
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("hide").classList.add("hidden");
      }
}

// pronunciation suction / শব্দের উচ্চারণ 

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// 1st step

let lessonData=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")  /**promise response */
    .then(res=>res.json())
    .then(data=>displayLesson(data.data)
)};

// create lesson-btn class remove function  
let removeClass=()=>{
    let all=document.querySelectorAll(".lesson-btn");
    all.forEach(activeBtn=>activeBtn.classList.remove("active"))
    
}

// 3rd step

let loadEachLessonWord =id=>{
  loading(true);
    let url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        removeClass();  /**remove all active class */
        let clickBtn=document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");  /**add active class only where you click */
        displayWord(data.data)
    }
    )};

// 5th step 
    let showDetails=id=>{
        url=`https://openapi.programming-hero.com/api/word/${id}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>displayDetails(data.data)
        )
    }

//     "word": "Linger",
// "meaning": "থেমে থাকা / বিলম্ব করা",
// "pronunciation": "লিঙ্গার",
// "level": 2,
// "sentence": "She lingered at the door, unwilling to leave.",
// "points": 2,
// "partsOfSpeech": "verb",
// "synonyms": [
// "stay",
// "remain",
// "delay"
// ],

// step-6
     let displayDetails=details=>{
       console.log(details);
        
        let detailsContainer=document.getElementById("detailsBox");
        detailsContainer.innerHTML=`
        <div>
          <h2 class="text-[30px] font-semibold font-bangla">${details.word} (<i class="fa-solid fa-microphone-lines"></i>:${details.pronunciation})</h2>
          <h4 class="text-[20px] font-semibold">Meaning</h4>
          <p class="text-gray-600 font-bangla">${details.meaning}</p>
          <h4 class="text-[20px] font-semibold">Example</h4>
          <p class="text-gray-600">${details.sentence}</p>
          <h4 class="text-[25px] font-semibold font-bangla">সমার্থক শব্দ গুলো</h4>
          <div class="flex-none">
    <ul class="menu menu-horizontal px-1 gap-3 ">
    ${all(details.synonyms)} </ul>
  </div>
        <button class="text-white bg-[#422ad5] rounded-xl w-[200px] p-4">Complete Learning</button>
        </div>
        `;

        document.getElementById("my_modal_5").showModal();  /**বুঝি নাই  */
        
     }

// 4th step

//     "id": 5,
// "level": 1,
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার"


let displayWord=words=>{
    let wordContainer=document.getElementById("word-container");
    wordContainer.innerHTML="";

    if(words.length==0){
        wordContainer.innerHTML=`
        <div class="col-span-full text-center">
           <img src="./assets/alert-error.png" class="mx-auto" alt="">
          <p class="text-[20px] text-gray-600 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h3 class="text-[40px] font-semibold font-bangla">নেক্সট Lesson এ যান ।</h3>
        </div>
        `;
        loading(false);
        return;
    }

    for(let word of words){
        let div=document.createElement("div")
        div.innerHTML=`
        <div class=" mt-4 h-[280px] w-[1/4] bg-white flex justify-center items-center text-center">
                <div class="">
                  <h3 class="text-[40px] font-bold">${word.word? word.word:"Word পাওয়া যায় নি"}</h3>
                <p class="text-[20px]">Meaning/Pronunciation</p>
                <p class="font-bangla text-[30px] text-[#313135]">"${word.meaning? word.meaning:"Meaning পাওয়া যায় নি"}/${word.pronunciation? word.pronunciation:"Pronouciation পাওয়া যায় নি"}"</p>
                <div class="flex justify-between items-center mt-10">
                  <button id="details" onclick="showDetails(${word.id})" class="border-1 border-gray-400 bg-gray-200 p-1"><i class="fa-solid fa-circle-info"></i></button>
                  <button onclick="pronounceWord('${word.word}')" class="border-1 border-gray-400 bg-gray-200 p-1"><i class="fa-solid fa-volume-high"></i></button>
                </div>
                </div>
        </div>
       
        `;
        
        wordContainer.appendChild(div);
    }
   loading(false);
}    

// 2nd step

let displayLesson=lessons=>{
        // call parent
        let lessonContainer=document.getElementById("lesson-container");
        lessonContainer.innerHTML="";

        lessons.forEach(lesson => {
            let div=document.createElement("div");
           div.innerHTML=` 
            <button id="lesson-btn-${lesson.level_no}" onclick="loadEachLessonWord(${lesson.level_no})" class="btn-nav px-3 py-2 mt-2 lesson-btn "><i class="fa-brands fa-leanpub"></i> lesson-${lesson.level_no}</button>
            `
        lessonContainer.appendChild(div)
        });
}
lessonData();


// search

document.getElementById("btn-search").addEventListener("click",()=>{
  removeClass();
   let input=document.getElementById ("input-search");
   let searchValue=input.value.trim().toLowerCase();
  //  input.value="";
  //  console.log(searchValue);
   
  fetch("https://openapi.programming-hero.com/api/words/all")
  .then(res=>res.json())
  .then(data=>{
      let allWords=data.data;
      let allWordsFilter=allWords.filter(word=>word.word.toLowerCase().includes(searchValue))
      displayWord(allWordsFilter);
    
  });

});