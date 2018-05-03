 document.addEventListener("DOMContentLoaded", function(event) {

    var dflt = {
      min: 0,      
      donut: true,
      gaugeWidthScale: 0.4,
      counter: true,
      hideInnerShadow: false,
      relativeGaugeSize: true,
      shadowSize: 5,
      shadowOpacity: 0.2,
      valueMinFontSize: 5    
    }
    
    /*Blue Membership Gauge */
    var gg1 = new JustGage({
      id: 'gg1',
      max: 800,
      value: userpointsBlueGaugeJS,
      title: "Points Needed",
      defaults: dflt
    });

    /*Gold Membership Gauge */
    var gg2 = new JustGage({
      id: 'gg2',
      max: userpointsGoldGaugeJS,
      value: userpointsGoldGaugeJS,
      title: "Current Points",
      levelColors: ["#F1E33C"],
      defaults: dflt
    });

    /*Gold Membership Gauge */
    var gg3 = new JustGage({
      id: 'gg3',
      max: 10,
      value: userpointsCardsGaugeJS,
      title: "Free Cards",
      levelColors: ["#B7D246"],
      defaults: dflt
    });
  
  });