var hambuger =document.querySelector('.hamburger');
var display = document.querySelector('.sec');

hambuger.addEventListener('click',() =>{
    display.classList.toggle("open");
    
});


const search = document.getElementById('search');
const submit = document.getElementById('submit');
const randomm = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const mealsEl = document.getElementById('meals');
const singleMeal = document.getElementById('single-meal');




function searchMeal(e){
    e.preventDefault();
   

    singleMeal.innerHTML= '';
    const term =search.value;
    
    if(term.trim()){
 
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
           

            resultHeading.innerHTML = `<h2>Search result for '${term}'</h2>`;
            if(data.meal=== null){
                resultHeading.innerHTML = `<p>There are no search results. Try again</p>`;
            }else{
                mealsEl.innerHTML = data.meals.map(meal =>`
                <div class="meal">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealID="${meal.idMeal}" >
                    <h3>${meal.strMeal}</h3>
                    
                    </div>
                 </div>
                `)
                .join('');
            }
            

        });
        search.value ="";

    }else{
        alert('PLease enter a search Meal');
    }
   

}

submit.addEventListener('submit', searchMeal);


function getRandomMeal(){
    mealsEl.innerHTML ="";
    resultHeading.innerHTML ='';
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
     .then(res => res.json())
     .then(data => {
         const meal = data.meals[0]
         addMealToDom(meal);
    });
     
}

randomm.addEventListener('click', getRandomMeal);


function getMealById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data =>{
       const meal = data.meals[0];

       addMealToDom(meal);
    });
}


function addMealToDom(meal){
    const ingredient =[];

    for(let i=1; i<=20 ; i++){
        if(meal[`strIngredient${i}`]){
            ingredient.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else{
            break ;
        }
       
    }
    singleMeal.innerHTML = `
      <div class="singlemeal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredient</h2>
            <ul>
               ${ingredient.map(ing => `<li>${ing}</li>`).join('')};

            </ul>
        </div>
      </div> 
    `;
}

mealsEl.addEventListener('click',e =>{
    const mealInfo = e.path.find(item =>{
        if(item.classList){
            return item.classList.contains('meal-info');
        }else{
            return false;
        }
    });
    
    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }
});