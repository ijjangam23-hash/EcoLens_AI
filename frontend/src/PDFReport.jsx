import jsPDF from "jspdf";


function downloadPDF(result, formData) {


  const doc = new jsPDF();


  doc.setFont("helvetica", "normal");


  const date = new Date().toLocaleDateString();



  // Header

  doc.setFontSize(24);

  doc.setFont("helvetica", "bold");

  doc.text(
    "EcoLens AI",
    105,
    20,
    { align: "center" }
  );


  doc.setFontSize(16);

  doc.setFont("helvetica", "normal");

  doc.text(
    "Carbon Footprint Report",
    105,
    32,
    { align: "center" }
  );


  doc.setFontSize(11);

  doc.text(
    `Generated Date: ${date}`,
    105,
    42,
    { align: "center" }
  );



  // Divider

  doc.line(
    20,
    50,
    190,
    50
  );




  let y = 65;



  // User Details

  doc.setFontSize(15);

  doc.setFont(
    "helvetica",
    "bold"
  );


  doc.text(
    "User Lifestyle Details",
    20,
    y
  );


  y += 12;


  doc.setFont(
    "helvetica",
    "normal"
  );


  doc.setFontSize(12);


  doc.text(
    `Vehicle: ${formData.vehicle}`,
    25,
    y
  );

  y += 10;


  doc.text(
    `Distance per day: ${formData.distance} km`,
    25,
    y
  );

  y += 10;


  doc.text(
    `Travel days: ${formData.days}`,
    25,
    y
  );

  y += 10;


  doc.text(
    `Diet: ${formData.diet}`,
    25,
    y
  );


  y += 10;


  doc.text(
    `Waste per week: ${formData.waste} kg`,
    25,
    y
  );




  y += 20;



  doc.line(
    20,
    y,
    190,
    y
  );


  y += 15;



  // Carbon Summary


  doc.setFont(
    "helvetica",
    "bold"
  );


  doc.setFontSize(15);


  doc.text(
    "Carbon Emission Summary",
    20,
    y
  );


  y += 12;


  doc.setFont(
    "helvetica",
    "normal"
  );


  doc.setFontSize(12);


  doc.text(
    `Transport: ${result.transport} kg CO2`,
    25,
    y
  );


  y += 10;


  doc.text(
    `Electricity: ${result.electricity} kg CO2`,
    25,
    y
  );


  y += 10;


  doc.text(
    `Food: ${result.food} kg CO2`,
    25,
    y
  );


  y += 10;


  doc.text(
    `Waste: ${result.waste} kg CO2`,
    25,
    y
  );



  y += 15;



  doc.setFont(
    "helvetica",
    "bold"
  );


  doc.setFontSize(14);


  doc.text(
    `Total Carbon: ${result.total_carbon} kg CO2`,
    25,
    y
  );



  y += 20;



  doc.line(
    20,
    y,
    190,
    y
  );



  y += 15;




  // AI Analysis


  if(result.analysis){


    doc.setFontSize(15);


    doc.text(
      "AI Carbon Analysis",
      20,
      y
    );


    y += 12;


    doc.setFontSize(12);


    doc.setFont(
      "helvetica",
      "normal"
    );


    doc.text(
      `Eco Score: ${result.analysis.eco_score}/100`,
      25,
      y
    );


    y += 10;


    doc.text(
      `Impact Level: ${result.analysis.impact_level}`,
      25,
      y
    );


    y += 10;


    doc.text(
      `Highest Contributor: ${result.analysis.highest_contributor}`,
      25,
      y
    );


  }




  // New page


  doc.addPage();



  y = 25;



  doc.setFont(
    "helvetica",
    "bold"
  );


  doc.setFontSize(15);


  doc.text(
    "AI Recommendations",
    20,
    y
  );


  y += 15;


  doc.setFont(
    "helvetica",
    "normal"
  );


  doc.setFontSize(12);



  if(result.recommendations){


    result.recommendations.forEach(
      (item,index)=>{


        doc.text(
          `${index+1}. ${item}`,
          25,
          y
        );


        y += 15;


      }
    );


  }



  y += 10;



  if(result.simulation){


    doc.setFont(
      "helvetica",
      "bold"
    );


    doc.setFontSize(15);


    doc.text(
      "Carbon Reduction Simulator",
      20,
      y
    );


    y += 15;


    doc.setFont(
      "helvetica",
      "normal"
    );


    doc.setFontSize(12);



    doc.text(
      `Current Vehicle: ${result.simulation.current_vehicle}`,
      25,
      y
    );


    y += 10;



    doc.text(
      `Recommended Option: ${result.simulation.recommended_vehicle}`,
      25,
      y
    );


    y += 10;



    doc.text(
      `Potential Saving: ${result.simulation.potential_saving} kg CO2/month`,
      25,
      y
    );


  }



  doc.save(
    "EcoLens_AI_Carbon_Report.pdf"
  );


}



export default downloadPDF;