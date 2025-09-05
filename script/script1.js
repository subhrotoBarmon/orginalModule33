let lessonData=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")  /**promise response */
    .then(res=>res.json())
    .then(data=>displayLesson(data.data)
)};

let loadEachLessonWord =id=>{
    let url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayWord(data.data)
    )};

//     "id": 5,
// "level": 1,
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার"

let displayWord=words=>{
    let wordContainer=document.getElementById("word-container");
    wordContainer.innerHTML="";

    for(let word of words){
        let div=document.createElement("div")
        div.innerHTML=`
        <div class=" mt-4 h-[280px] w-[350px] bg-white flex justify-center items-center text-center">
                <div class="">
                  <h3 class="text-[50px] font-bold">${word.word}</h3>
                <p class="text-[25px]">Meaning/Pronunciation</p>
                <p class="text-[40px] text-[#313135]">"${word.meaning}/${word.pronunciation}"</p>
                </div>
        </div>
        `
        wordContainer.appendChild(div);
    }
    
}    

let displayLesson=lessons=>{
        // call parent
        let lessonContainer=document.getElementById("lesson-container");
        lessonContainer.innerHTML="";

        lessons.forEach(lesson => {
            let div=document.createElement("div");
           div.innerHTML=` 
            <button onclick="loadEachLessonWord(${lesson.level_no})" class="btn-nav px-3 py-2 mt-2"><i class="fa-brands fa-leanpub"></i> lesson-${lesson.level_no}</button>
            `
        lessonContainer.appendChild(div)
        });
}
lessonData();