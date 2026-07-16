function ClimateCoach({result}){


const score=result.analysis?.eco_score || 0;

const contributor=
result.analysis?.highest_contributor;


let message="";

let mission="";


if(score>=85){

message=
"🌱 Excellent work! You are maintaining a sustainable lifestyle.";

mission=
"Continue your green habits and inspire others.";

}


else if(contributor==="Transport"){


message=
"🚗 Transportation is your biggest carbon source. Consider cycling, walking or public transport.";

mission=
"Try replacing one vehicle trip this week.";

}



else if(contributor==="Electricity"){


message=
"⚡ Your electricity usage needs attention. Smart energy habits can reduce emissions.";

mission=
"Switch off unused devices today.";

}



else if(contributor==="Food"){


message=
"🥗 Your food choices have a noticeable impact. Sustainable diets help the planet.";

mission=
"Try one low-carbon meal this week.";

}



else{


message=
"♻️ Small lifestyle changes can create a big environmental impact.";

mission=
"Reduce waste and recycle more.";

}



return(

<div className="climate-coach">


<h2>
🤖 AI Climate Coach
</h2>


<div className="coach-message">

{message}

</div>


<div className="coach-mission">

<h3>
🎯 Today's Climate Mission
</h3>

<p>
{mission}
</p>

</div>


<div className="coach-score">

<h3>
🌍 Your Eco Personality
</h3>


<p>

{

score>=90

?

"🌎 Climate Champion"

:

score>=75

?

"🌱 Green Guardian"

:

score>=50

?

"🌿 Eco Explorer"

:

"🔥 Carbon Reducer"

}

</p>


</div>


</div>


)

}


export default ClimateCoach;