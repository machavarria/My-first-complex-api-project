//Used Google gemini to help find some good exercise apis because the ones I was trying to use before weren't working//

document.querySelector('button').addEventListener('click', exerciseAndRecipe);

function exerciseAndRecipe(){
    const yourGoal = document.querySelector('#muscle');
    const goal = yourGoal.value.trim().toLowerCase();

    if(!goal){
        alert("Please select a muscle group!")
        return;
    }


    const workoutKey = 'e49a68f91fmshed38f2b5b25b9a4p1d88e6jsn0691e6cab137';
    const workoutHosting = 'exercisedb.p.rapidapi.com';


    const workoutUrl = `https://${workoutHosting}/exercises/target/${goal}`;
    const recipeUrl =  `https://www.themealdb.com/api/json/v1/1/random.php`;

    
    const foodPic = document.querySelector('#foodPic');
    const recipeLink = document.querySelector('#recipeLink')


    fetch(workoutUrl, {
        headers: { "X-RapidAPI-Key": workoutKey, 'X-RapidAPI-Host': workoutHosting}
    })
        .then(res => res.json())
        .then(workoutData => {
            console.log(workoutData)


            
            const exercise = workoutData[Math.floor(Math.random() * workoutData.length)];
            const name = exercise.name;
            const equipment = exercise.equipment;

            document.querySelector('h2').innerText = `Workout: ${name} | Equipment: ${equipment}`;

        })

        .catch(err => {
            console.log(`error: ${err}`);
        });

        fetch(recipeUrl)
            .then(res => res.json())
            .then(recipeData => {
                console.log(recipeData);


                const recipe = recipeData.meals[0];


                document.querySelector('h3').innerText = `Try this recipe: ${recipe.strMeal}`;
                foodPic.src = recipe.strMealThumb;
                foodPic.classList.add('show-block');
                recipeLink.href = recipe.strSource || recipe.strYoutube;
                recipeLink.classList.add('show-inline');

            })

            .catch(err => {
            console.log(`error: ${err}`);
        });
}