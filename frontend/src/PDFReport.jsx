import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


function downloadPDF(result, formData) {


const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
});


// ================= COLORS =================

const GREEN = [21,128,61];
const DARK_GREEN = [22,101,52];
const LIGHT_GREEN = [236,253,245];
const BLACK = [30,30,30];
const GREY = [100,100,100];



// ================= PAGE SETTINGS =================

const PAGE_WIDTH = pdf.internal.pageSize.getWidth();
const PAGE_HEIGHT = pdf.internal.pageSize.getHeight();

let currentPage = 1;



// ================= FONT SETTINGS =================

function setTitle(){

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(24);
    pdf.setTextColor(
        DARK_GREEN[0],
        DARK_GREEN[1],
        DARK_GREEN[2]
    );

}



function setHeading(){

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(17);

    pdf.setTextColor(
        DARK_GREEN[0],
        DARK_GREEN[1],
        DARK_GREEN[2]
    );

}



function setBody(){

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(11);

    pdf.setTextColor(
        BLACK[0],
        BLACK[1],
        BLACK[2]
    );

}



// ================= FOOTER =================


function addFooter(){

    const totalPages = pdf.internal.getNumberOfPages();


    for(let i=1;i<=totalPages;i++){

        pdf.setPage(i);


        pdf.setFont(
            "helvetica",
            "italic"
        );


        pdf.setFontSize(9);


        pdf.setTextColor(
            GREY[0],
            GREY[1],
            GREY[2]
        );


        pdf.text(
            "EcoLens AI | Sustainable Future Starts Today",
            15,
            PAGE_HEIGHT - 10
        );


        pdf.text(
            `Page ${i} of ${totalPages}`,
            175,
            PAGE_HEIGHT - 10
        );


    }

}




// ================= HEADER =================


function addHeader(){


    pdf.setFillColor(
        GREEN[0],
        GREEN[1],
        GREEN[2]
    );


    pdf.rect(
        0,
        0,
        PAGE_WIDTH,
        8,
        "F"
    );



    setTitle();


    pdf.text(
        "EcoLens AI",
        20,
        30
    );



    pdf.setFont(
        "helvetica",
        "normal"
    );


    pdf.setFontSize(14);


    pdf.setTextColor(
        BLACK[0],
        BLACK[1],
        BLACK[2]
    );



    pdf.text(
        "AI Powered Carbon Footprint Assessment Report",
        20,
        40
    );



    pdf.setDrawColor(
        GREEN[0],
        GREEN[1],
        GREEN[2]
    );


    pdf.line(
        20,
        48,
        190,
        48
    );


}



// ================= START PDF =================


addHeader();



// ================= SUMMARY TITLE =================


setHeading();


pdf.text(
    "Sustainability Intelligence Summary",
    20,
    70
);



setBody();


pdf.text(
    "Generated using EcoLens AI Carbon Analysis Engine",
    20,
    80
);



// ================= TOTAL CARBON CARD =================


pdf.setFillColor(
    LIGHT_GREEN[0],
    LIGHT_GREEN[1],
    LIGHT_GREEN[2]
);


pdf.roundedRect(
    20,
    95,
    170,
    45,
    6,
    6,
    "F"
);



pdf.setFont(
    "helvetica",
    "bold"
);


pdf.setFontSize(13);


pdf.setTextColor(
    GREY[0],
    GREY[1],
    GREY[2]
);


pdf.text(
    "Total Monthly Carbon Footprint",
    35,
    115
);



pdf.setFontSize(22);


pdf.setTextColor(
    GREEN[0],
    GREEN[1],
    GREEN[2]
);


pdf.text(
    `${result.total_carbon} kg CO2`,
    35,
    130
);


// ================= EXECUTIVE ASSESSMENT =================


setHeading();


pdf.text(
    "Executive Assessment",
    20,
    165
);




autoTable(pdf,{

    startY:175,


    theme:"grid",


    head:[

        [
            "Assessment Metric",
            "Result"
        ]

    ],



    body:[


        [
            "Eco Score",
            `${result.analysis?.eco_score || 0}/100`
        ],


        [
            "Impact Level",
            result.analysis?.impact_level || "N/A"
        ],


        [
            "Highest Contributor",
            result.analysis?.highest_contributor || "N/A"
        ],


        [
            "Reduction Potential",
            `${result.simulation?.potential_saving || 0} kg CO2/month`
        ]


    ],



    styles:{


        font:"helvetica",

        fontSize:11,

        cellPadding:6,


        textColor:BLACK

    },



    headStyles:{


        fillColor:GREEN,


        textColor:255,


        fontStyle:"bold",


        fontSize:12

    },



    columnStyles:{


        0:{
            fontStyle:"bold",
            cellWidth:75
        },


        1:{
            cellWidth:90
        }

    }



});






// ================= NEW PAGE =================


pdf.addPage();

currentPage++;

addHeader();





// ================= LIFESTYLE PROFILE =================


setHeading();


pdf.text(
    "1. Lifestyle Profile",
    20,
    70
);



setBody();


pdf.text(
    "User lifestyle information used for carbon calculation",
    20,
    80
);






autoTable(pdf,{

    startY:90,


    theme:"grid",



    head:[

        [
            "Parameter",
            "Details"
        ]

    ],



    body:[


        [
            "Vehicle Type",
            formData.vehicle
        ],


        [
            "Daily Travel Distance",
            `${formData.distance} km`
        ],


        [
            "Travel Days",
            `${formData.days} days/month`
        ],


        [
            "Electricity Consumption",
            `${formData.electricity} units/month`
        ],


        [
            "Diet Preference",
            formData.diet
        ],


        [
            "Waste Generation",
            `${formData.waste} kg/week`
        ]



    ],



    styles:{


        font:"helvetica",

        fontSize:11,

        cellPadding:6,


        overflow:"linebreak"


    },



    headStyles:{


        fillColor:GREEN,

        textColor:255,

        fontStyle:"bold"

    },



    columnStyles:{


        0:{
            fontStyle:"bold",
            cellWidth:75
        },


        1:{
            cellWidth:90
        }

    }


});







// ================= CARBON EMISSION ANALYSIS =================



let emissionY =
pdf.lastAutoTable.finalY + 25;




setHeading();



pdf.text(
    "2. Carbon Emission Analysis",
    20,
    emissionY
);



setBody();


pdf.text(
    "Breakdown of estimated carbon emissions by category",
    20,
    emissionY + 10
);





autoTable(pdf,{

    startY:emissionY + 20,


    theme:"grid",


    head:[

        [
            "Emission Source",
            "Carbon Output"
        ]

    ],



    body:[


        [
            "Transport",
            `${result.transport} kg CO2`
        ],


        [
            "Electricity",
            `${result.electricity} kg CO2`
        ],


        [
            "Food",
            `${result.food} kg CO2`
        ],


        [
            "Waste",
            `${result.waste} kg CO2`
        ],


        [
            "Total Carbon Footprint",
            `${result.total_carbon} kg CO2`
        ]


    ],



    styles:{


        font:"helvetica",

        fontSize:11,

        cellPadding:6,

        overflow:"linebreak"

    },



    headStyles:{


        fillColor:GREEN,

        textColor:255,

        fontStyle:"bold"

    },



    columnStyles:{


        0:{
            fontStyle:"bold",
            cellWidth:80
        },


        1:{
            cellWidth:85
        }

    }


});
// ================= NEW PAGE =================


pdf.addPage();

currentPage++;

addHeader();




// ================= AI CARBON INTELLIGENCE =================


setHeading();


pdf.text(
    "3. AI Carbon Intelligence",
    20,
    70
);



setBody();


pdf.text(
    "Artificial intelligence based environmental assessment",
    20,
    80
);





autoTable(pdf,{

    startY:95,


    theme:"grid",



    head:[

        [
            "AI Parameter",
            "Assessment"
        ]

    ],



    body:[


        [
            "Eco Score",
            `${result.analysis?.eco_score || 0}/100`
        ],



        [
            "Environmental Impact Level",
            result.analysis?.impact_level || "N/A"
        ],



        [
            "Highest Emission Contributor",
            result.analysis?.highest_contributor || "N/A"
        ],



        [
            "Contributor Emission",
            `${result.analysis?.highest_contributor_value || 0} kg CO2`
        ]


    ],



    styles:{


        font:"helvetica",

        fontSize:11,

        cellPadding:7,

        overflow:"linebreak"

    },



    headStyles:{


        fillColor:GREEN,

        textColor:255,

        fontStyle:"bold"

    },



    columnStyles:{


        0:{
            fontStyle:"bold",
            cellWidth:80
        },


        1:{
            cellWidth:85
        }

    }


});






// ================= AI INSIGHT =================



let insightY =
pdf.lastAutoTable.finalY + 30;



setHeading();



pdf.text(
    "4. AI Sustainability Insight",
    20,
    insightY
);




setBody();



pdf.text(
    "AI generated recommendation based on your environmental impact analysis.",
    20,
    insightY + 12
);





let message =

result.analysis?.analysis_message ||

"Follow sustainable practices to reduce your carbon footprint.";





pdf.setFillColor(

    LIGHT_GREEN[0],

    LIGHT_GREEN[1],

    LIGHT_GREEN[2]

);



pdf.roundedRect(

    20,

    insightY + 25,

    170,

    45,

    5,

    5,

    "F"

);





pdf.setFont(

    "helvetica",

    "normal"

);


pdf.setFontSize(11);


pdf.setTextColor(

    BLACK[0],

    BLACK[1],

    BLACK[2]

);





pdf.text(

    message,

    30,

    insightY + 45,

    {

        maxWidth:150

    }

);







// ================= PAGE SPACE CHECK =================


if(

    insightY + 85 > 260

){


    pdf.addPage();

    currentPage++;

}





// ================= RECOMMENDATIONS =================



let recommendationStart =

pdf.internal.getCurrentPageInfo().pageNumber === currentPage

?

pdf.lastAutoTable.finalY + 120

:

40;





if(recommendationStart > 240){


    pdf.addPage();

    currentPage++;

    recommendationStart = 70;

}






setHeading();



pdf.text(

    "5. AI Sustainability Recommendations",

    20,

    recommendationStart

);




setBody();



pdf.text(

    "Personalized recommendations generated from AI carbon analysis",

    20,

    recommendationStart + 12

);






let recommendations =

result.recommendations || [];






autoTable(pdf,{

    startY:recommendationStart + 25,


    theme:"grid",



    head:[


        [

            "No.",

            "Recommendation"

        ]


    ],




    body:

    recommendations.length > 0

    ?

    recommendations.map(

        (item,index)=>

        [

            index + 1,

            item

        ]

    )

    :

    [

        [

            "-",

            "No recommendations available"

        ]

    ],





    styles:{


        font:"helvetica",

        fontSize:11,

        cellPadding:8,

        overflow:"linebreak",

        valign:"middle"

    },



    headStyles:{


        fillColor:GREEN,

        textColor:255,

        fontStyle:"bold"

    },



    columnStyles:{


        0:{

            cellWidth:20,

            halign:"center",

            fontStyle:"bold"

        },


        1:{

            cellWidth:150

        }


    }


});
// ================= CARBON REDUCTION SIMULATOR =================



pdf.addPage();

currentPage++;

addHeader();





setHeading();



pdf.text(

    "6. Carbon Reduction Simulator",

    20,

    70

);






setBody();



pdf.text(

    "AI based prediction for reducing future carbon emissions",

    20,

    82

);







autoTable(pdf,{


    startY:95,


    theme:"grid",



    head:[


        [

            "Parameter",

            "Result"

        ]

    ],




    body:[



        [

            "Current Lifestyle Choice",

            result.simulation?.current_vehicle || "N/A"

        ],




        [

            "Recommended Sustainable Choice",

            result.simulation?.recommended_vehicle || "N/A"

        ],




        [

            "Possible Carbon Reduction",

            `${result.simulation?.potential_saving || 0} kg CO2/month`

        ]



    ],





    styles:{


        font:"helvetica",

        fontSize:11,

        cellPadding:8,

        overflow:"linebreak"


    },




    headStyles:{


        fillColor:DARK_GREEN,

        textColor:255,

        fontStyle:"bold"

    },




    columnStyles:{



        0:{

            fontStyle:"bold",

            cellWidth:85

        },



        1:{

            cellWidth:85

        }



    }



});







// ================= SIMULATION EXPLANATION =================




let simulationY =

pdf.lastAutoTable.finalY + 35;






pdf.setFillColor(

    LIGHT_GREEN[0],

    LIGHT_GREEN[1],

    LIGHT_GREEN[2]

);





pdf.roundedRect(

    20,

    simulationY,

    170,

    45,

    6,

    6,

    "F"

);






pdf.setFont(

    "helvetica",

    "bold"

);



pdf.setFontSize(13);



pdf.setTextColor(

    DARK_GREEN[0],

    DARK_GREEN[1],

    DARK_GREEN[2]

);



pdf.text(

    "AI Prediction Summary",

    35,

    simulationY + 18

);







pdf.setFont(

    "helvetica",

    "normal"

);



pdf.setFontSize(11);



pdf.setTextColor(

    BLACK[0],

    BLACK[1],

    BLACK[2]

);





pdf.text(

    "Switching towards sustainable alternatives can",

    35,

    simulationY + 30

);



pdf.text(

    "reduce emissions and improve your Eco Score.",

    35,

    simulationY + 40

);
// ================= FINAL SUSTAINABILITY SUMMARY =================



let finalSummaryY =

pdf.lastAutoTable.finalY + 90;




if(finalSummaryY > 240){


    pdf.addPage();

    currentPage++;

    addHeader();

    finalSummaryY = 70;


}






setHeading();



pdf.text(

    "Final Sustainability Summary",

    20,

    finalSummaryY

);






setBody();



pdf.text(

    "Overall environmental assessment generated by EcoLens AI",

    20,

    finalSummaryY + 12

);








// Summary Box



pdf.setFillColor(

    LIGHT_GREEN[0],

    LIGHT_GREEN[1],

    LIGHT_GREEN[2]

);





pdf.roundedRect(

    20,

    finalSummaryY + 25,

    170,

    70,

    6,

    6,

    "F"

);






let summaryText = [

    [

        "Total Carbon Footprint",

        `${result.total_carbon || 0} kg CO2/month`

    ],



    [

        "Eco Score",

        `${result.analysis?.eco_score || 0}/100`

    ],



    [

        "Environmental Status",

        result.analysis?.impact_level || "N/A"

    ],



    [

        "Primary Emission Source",

        result.analysis?.highest_contributor || "N/A"

    ]

];







let summaryPosition = finalSummaryY + 45;






summaryText.forEach((item)=>{



    pdf.setFont(

        "helvetica",

        "bold"

    );



    pdf.setFontSize(11);



    pdf.setTextColor(

        DARK_GREEN[0],

        DARK_GREEN[1],

        DARK_GREEN[2]

    );



    pdf.text(

        item[0],

        35,

        summaryPosition

    );






    pdf.setFont(

        "helvetica",

        "normal"

    );



    pdf.setTextColor(

        BLACK[0],

        BLACK[1],

        BLACK[2]

    );



    pdf.text(

        item[1],

        115,

        summaryPosition

    );




    summaryPosition += 12;



});









// ================= CLOSING MESSAGE =================



let closingY =

finalSummaryY + 125;





if(closingY > 260){


    pdf.addPage();

    currentPage++;

    addHeader();

    closingY = 70;


}






setHeading();



pdf.text(

    "EcoLens AI Closing Statement",

    20,

    closingY

);






setBody();



pdf.text(

    "EcoLens AI analysis indicates that",

    20,

    closingY + 15

);



pdf.text(

    "consistent sustainable choices can",

    20,

    closingY + 25

);



pdf.text(

    "create a measurable environmental impact.",

    20,

    closingY + 35

);
// ================= FOOTER & PAGE NUMBERS =================



const totalPages = pdf.internal.getNumberOfPages();




for(let i = 1; i <= totalPages; i++){


    pdf.setPage(i);



    pdf.setDrawColor(

        220,

        220,

        220

    );


    pdf.line(

        20,

        278,

        190,

        278

    );





    pdf.setFont(

        "helvetica",

        "italic"

    );


    pdf.setFontSize(9);



    pdf.setTextColor(

        100,

        100,

        100

    );





    pdf.text(

        "EcoLens AI | Sustainable Future Starts Today",

        20,

        285

    );






    pdf.text(

        `Page ${i} of ${totalPages}`,

        170,

        285

    );



}







// ================= SAVE REPORT =================



pdf.save(

    "EcoLens_AI_Carbon_Assessment_Report.pdf"

);



}



// ================= EXPORT =================



export default downloadPDF;