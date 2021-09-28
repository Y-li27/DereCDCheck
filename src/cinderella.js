var ownList = [];
var cm1List = [16575,16576,16577,16578,16579,16628,16629,16630,16631,16632,16683,16684,16685,16686,16687,16734,16735,16736,16737,16738,16778,16779,16780,16781,16782,16877,16878,16879,16880,16881,17001,17002,17003,17004,17005,17091,17092,17093,17094,17095,17131,17132,17133,17134,17135,17286,17287,17288,17437,17438,17439,17628,17629,17630,17773,17774,17775,17886,17887,17888];
var cm2List = [16718,16727,16908,17245,17282,17283,17414,17458,17415,17541,17729,17851,38251,38252,38253,38967,38968,38969,39651,39652,39653]
var cgssList = [17141,17142,17143,17144,17145,17146,17147,17148,17149,17150,17151,17152,17153,17154,17155,17156,17157,17158,17159,17160,17511,17512,17513,17514,17515,17516,17517,17518,17519,17520,17521,17522,17523,17692,17524,17525,17526,17527,17528,17529,17530,17701,17702,17703,17704,17705,17706,17707,17708,17709,17710,17831,17832,17833,17834,17835,17836,17837,17838,17839,17840]
var animeList = [39035,16994,17023,17024,17025,17026,17027,17028,1151,17061,17062,17063,17064,17065,17066,17067]
var puchiList = [17311,17312,17313,17391,17392,17393,17501,17502,17503,17611,17612,17613,17801,17802,17803,17804]
var chrordList = [17693,17694,17695]
var seasonList = [17331,17332,17333,17334]
var otherList = [17261,17495,17741,17813,17912]
var derepaList = [1063,1172,40487]
var collaboList = [17862,17874]
var allList = [16575,16576,16577,16578,16579,16628,16629,16630,16631,16632,
				16683,16684,16685,16686,16687,16734,16735,16736,16737,16738,
				16778,16779,16780,16781,16782,16877,16878,16879,16880,16881,
				17001,17002,17003,17004,17005,17091,17092,17093,17094,17095,
				17131,17132,17133,17134,17135,17286,17287,17288,17437,17438,
				17439,17628,17629,17630,17773,17774,17775,17886,17887,17888,
				16718,16727,16908,17245,17282,17283,17414,17458,17415,17541,
				17729,17851,38251,38252,38253,38967,38968,38969,39651,39652,
				39653,17141,17142,17143,17144,17145,17146,17147,17148,17149,
				17150,17151,17152,17153,17154,17155,17156,17157,17158,17159,
				17160,17511,17512,17513,17514,17515,17516,17517,17518,17519,
				17520,17521,17522,17523,17692,17524,17525,17526,17527,17528,
				17529,17530,17701,17702,17703,17704,17705,17706,17707,17708,
				17709,17710,17831,17832,17833,17834,17835,17836,17837,17838,
				17839,17840,39035,16994,17023,17024,17025,17026,17027,17028,
				1151,17061,17062,17063,17064,17065,17066,17067,17311,17312,
				17313,17391,17392,17393,17501,17502,17503,17611,17612,17613,
				17801,17802,17803,17804,17693,17694,17695,17331,17332,17333,
				17334,17261,17495,17741,17813,17912,1063,1172,40487,17862,17874];
var imgWidth = 100;
var imgHeight = 100;

function init()
{
	for(var i=0;i<190;i++) ownList[i]=0;
	LoadSelectPicture();
}
function ChangeBGColor(line,color)
{
	var bgId = "#"+line+"BG";
	var bg = d3.select(bgId).attr("fill",color);
}
function RemoveElement(element)
{
	d3.select(element).remove();
}
function OwnOrNot(element)
{
	var fullLink = d3.select(element).attr("xlink:href");
	fullLink = fullLink.slice(6);
	fullLink = fullLink.slice(0,3);
	fullLink = parseInt(fullLink);	
	var op = d3.select(element).attr("opacity");
	if(op == 0.3)
	{
		ownList[fullLink] = 1;
		op = 1;		
	} 
	else
	{
		if(addCharacterModeOn)
		{
			var numberOfLine = addTargetSVG.node().childNodes.length-2;
			if(addTargetSVG.attr("id")=="deafaultLineSVG") numberOfLine-=2;			
			var x;
			var y;
			var picLink = d3.select(element).attr("xlink:href");

			if(numberOfLine==0)
			{
				x = imgWidth/2;
				y = 150/2-imgHeight/2;
			}
			else
			{
				x = imgWidth/2 + (numberOfLine%11)*(parseInt(imgWidth)+10);
				y = 150/2-imgHeight/2 + (parseInt(numberOfLine/11))*(parseInt(imgHeight)+10);
				if( numberOfLine%11==0 && numberOfLine)
				{
					addTargetSVG.attr("height",parseInt(y+100)+imgHeight/2);
				}
			}
			var group = addTargetSVG.append("g");
			group.append("svg:image")
			.attr('x', x)
			.attr('y', y)
			.attr('width', imgWidth)
			.attr('height', imgHeight)
			.attr("xlink:href", picLink)//"./img/001.jpg"
			.attr("onclick","RemoveElement(this.parentNode)")
			.attr("opacity",op);
		}
		else
		{
			ownList[fullLink] = 0;
			op=0.5;			
		}		
	}	
	d3.select(element).attr("opacity",op);
	updateOwnText(ownList);
}
function LoadSelectPicture()
{		
	var svgId = "#selectViewSVG";
	var svg = d3.select(svgId);	
	clearSVGContent("selectViewSVG");
	var background = d3.select("#selectViewBG");
	var svgHeight = d3.select(svgId).attr("height");

	var imgWidth = 100;
	var imgHeight = 100;
	var initX = imgWidth/2;
	var initY = 150/2-imgHeight/2;//height/2 - imgHeight/2
	var x = initX;
	var y = initY;
	
	var selectionTag = document.getElementById("filterTag");
	var chosenList;
	if(selectionTag.value == "all") chosenList=allList;
	else if(selectionTag.value == "cm1") chosenList=cm1List;
	else if(selectionTag.value == "cm2") chosenList=cm2List;
	else if(selectionTag.value == "cgss") chosenList=cgssList;
	else if(selectionTag.value == "anime") chosenList=animeList;
	else if(selectionTag.value == "puchi") chosenList=puchiList;
	else if(selectionTag.value == "season") chosenList=seasonList;
	else if(selectionTag.value == "chrord") chosenList=chrordList;
	else if(selectionTag.value == "other") chosenList=otherList;
	else if(selectionTag.value == "derepa") chosenList=derepaList;
	else if(selectionTag.value == "collabo") chosenList=collaboList;
	else	chosenList="errorList"

	if(chosenList!="errorList")
	{
		x = initX;
		y = initY;
		var i=0;
		while(i<chosenList.length)
		{
			var number = chosenList[i];
			var picLink = 	"./img/";
			if( number<10 )	number="00"+number;
			else if( number<100) number = "0"+number;
			picLink=picLink+number+".jpg";

			var op;
			if( ownList[parseInt(number)]>0) op=1;
			else op=0.3;

			var group = svg.append("g");
			group.append("svg:image")
			.attr('x', x)
			.attr('y', y)
			.attr('width', imgWidth)
			.attr('height', imgHeight)
			.attr("xlink:href", picLink)//"./img/001.jpg"
			.attr("border-radius",10)
			.attr("onerror","RemoveElement(this.parentNode)")
			.attr("onclick","OwnOrNot(this)")
			.attr("opacity",op);
			x = x+imgWidth+10; 
			var selectViewSVGWidth = d3.select("#selectViewSVG").attr("width");
			if(x+imgWidth>selectViewSVGWidth)
			{
				y=y+imgHeight+10;
				x=initX;
				svgHeight = d3.select(svgId).attr("height");
				var tempSVGHeight = parseInt(svgHeight) + parseInt(imgHeight) + 10;
				svg.attr("height",tempSVGHeight);
				background.attr("height",tempSVGHeight);
			}
			i++;			
		}
	}	
}
function saveJSONFile()
{	
	var jsonData = 
	{
		"ownList":ownList,
	}

	var lineAllDiv = d3.select(lineView).selectAll("div");
	var charList = [];
	var lineID ;
	for(var j=0; j<lineAllDiv[0].length;j++)
	{
		lineID = d3.select(lineAllDiv[0][j]).attr("id");
		var linesvg = d3.select(lineAllDiv[0][j]).selectAll("svg");
		var charInLine = d3.select(linesvg[0][0]).selectAll("g");
		for(var i in charInLine[0])
		{
			if(charInLine[0][i].tagName=="g")
			{
				var image = d3.select(charInLine[0][i]).selectAll("image");
				var number = d3.select(image[0][0]).attr("xlink:href");
				number = number.slice(6);
				number = number.slice(0,3)
				number = parseInt(number);
				charList.push(number);
			}
		}
		var lineName = "#"+lineID+"Name";
		var lineBG = "#"+lineID+"BG";
		jsonData[lineID]={"name":d3.select(lineName).text(),
			"backgroundColor":d3.select(lineBG).attr("fill"),
			"characters":charList};
		charList=[];
	}

	var jsonFinData = JSON.stringify(jsonData);
	var name = "azurlane_record.txt";
	var type = "text/plain"
    var a = document.createElement("a");
    var file = new Blob([jsonFinData], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}
var loadJSONFile = function(event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function(){
	        var text = reader.result;
	        var oldData = JSON.parse(text);
	        for(var key in oldData) {
			    var item = oldData[key];
			    if(key =="ownList") ownList = oldData[key];
			    else if(key=="deafaultLine")
			    {
			    	d3.select("#deafaultLineBGC").node().value=oldData[key]["backgroundColor"];
			    	d3.select("#deafaultLineBG").attr("fill",oldData[key]["backgroundColor"]);
			    	d3.select("#deafaultLineName").text(oldData[key]["name"]);
					var oldcharacterList = oldData[key]["characters"];
					var addtoSVG = d3.select("#deafaultLineSVG");
			    	for(var characterNo=0;characterNo<oldcharacterList.length;characterNo++)
					{
						var x;
						var y;						
						var number = oldcharacterList[characterNo];
						var picLink = 	"./img/";

						if( number<10 )	number="00"+number;
						else if( number<100) number = "0"+number;
						picLink=picLink+number+".jpg";
						var op;
						if( ownList[parseInt(number)]>0) op=1;
						else op=0.3;

						if(characterNo==0)
						{
							x = imgWidth/2;
							y = 150/2-imgHeight/2;
						}
						else
						{
							x = imgWidth/2 + (characterNo%11)*(parseInt(imgWidth)+10);
							y = 150/2-imgHeight/2 + (parseInt(characterNo/11))*(parseInt(imgHeight)+10);
							if( characterNo%11==0 && characterNo)
							{
								addtoSVG.attr("height",parseInt(y+100)+imgHeight/2);
							}
						}
						var group = addtoSVG.append("g");
						group.append("svg:image")
						.attr('x', x)
						.attr('y', y)
						.attr('width', imgWidth)
						.attr('height', imgHeight)
						.attr("xlink:href", picLink)//"./img/001.jpg"
						.attr("onclick","RemoveElement(this.parentNode)")
						.attr("opacity",op);
					}
			    } 
			    else
			    {
			    	var lineView = d3.select("#lineView");
					var lineID = key;
					var lineIDName = lineID+"Name";
					var lineBGC = lineID+"BGC"
					var lineDiv = lineView.append("div").attr("id",lineID);
					customLine+=1;
					var lineName = oldData[key]["name"];
					lineDiv.append("text")
						.attr("contentEditable","true")
						.attr("style","font-size:20pt")
						.attr("size","15")
						.attr("id",lineIDName)
						.text(lineName);
					lineDiv.append("input")
						.attr("type","color")
						.attr("value",oldData[key]["backgroundColor"])
						.attr("id",lineBGC)
						.attr("onchange","ChangeBGColor(this.parentNode.id,this.value)")
						.attr("style","margin:5px");
					lineDiv.append("button")
						.text("削除")
						.attr("onclick","RemoveElement(this.parentNode)")
						.attr("style","margin:5px");
					lineDiv.append("br")
					var lineSVGID = lineID+"SVG";
					var lineSVG = lineDiv.append("svg")
						.attr("id",lineSVGID) 
						.attr("width","1300")
						.attr("height","150");

					var lineBGID = lineID+"BG";
						lineSVG.append("svg:rect")
						.attr("id",lineBGID) 
						.attr("width","1300")
						.attr("height","150")
						.attr("stroke","black")
						.attr("stroke-width","5pt")
						.attr("fill",oldData[key]["backgroundColor"])
						.attr("onclick","addCharacterMode(this.parentNode.id)");
					var oldcharacterList = oldData[key]["characters"];
					var addtoSVG = d3.select("#"+lineSVGID);
					for(var characterNo=0;characterNo<oldcharacterList.length;characterNo++)
					{
						var x;
						var y;						
						var number = oldcharacterList[characterNo];
						var picLink = 	"./img/";

						if( number<10 )	number="00"+number;
						else if( number<100) number = "0"+number;
						picLink=picLink+number+".jpg";
						var op;
						if( ownList[parseInt(number)]>0) op=1;
						else op=0.3;

						if(characterNo==0)
						{
							x = imgWidth/2;
							y = 150/2-imgHeight/2;
						}
						else
						{
							x = imgWidth/2 + (characterNo%11)*(parseInt(imgWidth)+10);
							y = 150/2-imgHeight/2 + (parseInt(characterNo/11))*(parseInt(imgHeight)+10);
							if( characterNo%11==0 && characterNo)
							{
								addtoSVG.attr("height",parseInt(y+100)+imgHeight/2);
							}
						}
						var group = addtoSVG.append("g");
						group.append("svg:image")
						.attr('x', x)
						.attr('y', y)
						.attr('width', imgWidth)
						.attr('height', imgHeight)
						.attr("xlink:href", picLink)//"./img/001.jpg"
						.attr("onclick","RemoveElement(this.parentNode)")
						.attr("opacity",op);
					}					
			    }
			}
	        updateOwnText(ownList);
	        LoadSelectPicture();
        };
        reader.readAsText(input.files[0]);        
    };

function updateOwnText( targetList )
{
	var total = allList.length;
	var own = 0 ;
	for(var i=0;i<targetList.length;i++)
	{
		if(targetList[i]!=0) own=own+1;
	}	
	var ownText = document.getElementById("ownText");
	var ownPercent;
	if( parseInt(own)==0) ownPercent=0;
	else ownPercent= own/190*100;
	ownPercent = ownPercent.toFixed(2);
	ownText.innerText="【所有率: "+ ownPercent + " %】"
}

function clearSVGContent(svgId)
{
	var targetSVG = document.getElementById(svgId);
	var allChild = targetSVG.children;

	while(allChild.length>1)
	{
		for(var i in allChild)
		{
			if(allChild[i].id!="selectViewBG") RemoveElement(allChild[i]);
		}
	}
	var idString = "#"+svgId;
	var svg = d3.select(idString);
	var svgBG = d3.select(selectViewBG);
	svg.attr("height","150")
	   .attr("width","1300");
	svgBG.attr("height","150")
	   .attr("width","1300");
}
var addCharacterModeOn=false;
var addTargetSVG;
function addCharacterMode(svgId)
{
	if(document.getElementById("selectRect"))
	{
		if(svgId==document.getElementById("selectRect").parentNode.id)
		{
			addCharacterModeOn=!addCharacterModeOn;			
		}
		else
		{
			d3.select("#selectRect").remove();
		}
	}
	else
	{
		addCharacterModeOn=!addCharacterModeOn;
	}
	
	if(addCharacterModeOn)
	{
		var SVGDom = document.getElementById(svgId);
		svgId = "#"+svgId;
		addTargetSVG = d3.select(svgId);
		var width = addTargetSVG.attr("width")*0.95;
		var height = addTargetSVG.attr("height")*0.8;
		var x = addTargetSVG.attr("width")*0.025;
		var y = addTargetSVG.attr("height")*0.1;

		d3.select(svgId).append("svg:rect")
		.attr("width",width)
		.attr("height",height)
		.attr("x",x)
		.attr("y",y)
		.attr("fill","None")
		.attr("stroke","red")
		.attr("stroke-width","10")
		.attr("id","selectRect");
	}
	else
	{
		d3.select("#selectRect").remove();
	}
}
var customLine = 0;
function addNewLine()
{
	var lineView = d3.select("#lineView");
	var lineID = "customLine"+customLine;
	var lineIDName = lineID+"Name";
	var lineBGC = lineID+"BGC"
	var lineDiv = lineView.append("div").attr("id",lineID);
	customLine+=1;
	lineDiv.append("text")
		.attr("contentEditable","true")
		.attr("style","font-size:20pt")
		.attr("size","15")
		.attr("id",lineIDName)
		.text(lineName);
	lineDiv.append("input")
		.attr("type","color")
		.attr("value","#FFFFFF")
		.attr("id",lineBGC)
		.attr("onchange","ChangeBGColor(this.parentNode.id,this.value)")
		.attr("style","margin:5px");
	lineDiv.append("button")
		.text("削除")
		.attr("onclick","RemoveElement(this.parentNode)")
		.attr("style","margin:5px");
	lineDiv.append("br")
	var lineSVGID = lineID+"SVG";
	var lineSVG = lineDiv.append("svg")
		.attr("id",lineSVGID) 
		.attr("width","1300")
		.attr("height","150");

	var lineBGID = lineID+"BG";
		lineSVG.append("svg:rect")
		.attr("id",lineBGID) 
		.attr("width","1300")
		.attr("height","150")
		.attr("stroke","black")
		.attr("stroke-width","5pt")
		.attr("fill","#FFFFFF")
		.attr("onclick","addCharacterMode(this.parentNode.id)");
}
init();