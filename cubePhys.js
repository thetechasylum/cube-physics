$(document).ready(function(){
	
	
	var canvas = $("#Project4");
	var context = canvas.get(0).getContext("2d");
	var canvasWidth = 500;
	var canvasHeight = 500;
	var numberOfCubes = 90;
	var maxWidth = 10;
	var maxHeight = 10;
	var maxVeleocity = 8;
	var minVelocity = 4;
	var maxAcceleration = 0.8;
	var minAcceleraion = 0.4;
	
	$(window).resize(resizeCanvas);
	
	function resizeCanvas()
	{
		//canvas.attr("width",$(window).get(0).innerWidth);
		//canvas.attr("height",$(window).get(0).innnerHeight);
		canvasWidth = 500;
		canvasHeight = 500;
		
		
	};
	resizeCanvas();
	
	// cube class
	var Cube = function(x,y,width,height,vX,vY,aX,aY,mass)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.vX = vX;
		this.vY = vY;
		this.aX = aX;
		this.aY = aY;
		this.mass = mass;
			
	};
	
	var cubes = new Array();
	
	
	// create each cube
	for(var i = 0; i < numberOfCubes;i++)
	{
		var x = Math.random()*canvasWidth;
		var y = Math.random()*canvasHeight;
		var width = Math.random()*maxWidth;
		var height = width;
		var vX= Math.random()*maxVeleocity-minVelocity;
		var vY = Math.random()*maxVeleocity-minVelocity;
		var aX = Math.random()*maxAcceleration-minAcceleraion;
		var aY = Math.random()*maxAcceleration-minAcceleraion;
		var mass = width*height/2;
		var size = Math.random()*100;
		
		//context.fillRect(x,y,size,size);
		context.fillStyle = 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
		cubes.push(new Cube(x,y,width,height,vX,vY,aX,aY,mass));
	
	};
	
	// animation loop
	function animate()
	{
		// simulate flipping pages
		context.clearRect(0,0,canvasWidth,canvasHeight);
		//context.fillStyle = 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
		var cubesLength = cubes.length;
		
		for(var i=0; i<cubesLength;i++)
		{
			var tmpCube = cubes[i];
			
			//context.fillStyle = 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
			context.fillRect(tmpCube.x, tmpCube.y, tmpCube.width, tmpCube.height);
			tmpCube.x+=tmpCube.vX;
			tmpCube.y+=tmpCube.vY;
			
			if(tmpCube.x<0)
			{
				//set x position to current position
				tmpCube.x = tmpCube.x;
				tmpCube.vX*=-1;
				tmpCube.aX*=-1;
				
			}else if(tmpCube.x+tmpCube.width > canvasWidth)
			{
				tmpCube.x = tmpCube.x;
				tmpCube.vX*=-1;
				tmpCube.aX*=-1;
				
			};
			
			if(tmpCube.y < 0)
			{
				tmpCube.y = tmpCube.y;
				tmpCube.vY*=-1;
				tmpCube.aY*=-1;
				
			}else if(tmpCube.y+tmpCube.height> canvasHeight)
			{
				tmpCube.y = tmpCube.y;
				tmpCube.vY*=-1;
				tmpCube.aY*=-1;
				
			};
			
			//collision detection
			
			for(var j=i+1;j<cubes.length;j++)
			{
				
				tmpCubeB = cubes[j];
					var vXb = tmpCubeB.vX;
					var vTotal = vX -vXb;
					
				
				if(!(tmpCube.x+tmpCube.width < tmpCubeB.x) &&
				!(tmpCubeB.x+tmpCubeB.width<tmpCube.x)&&
				!(tmpCube.y+tmpCube.height<tmpCubeB.y)&&
				!(tmpCubeB.y+tmpCubeB.height<tmpCube.y))
				{
				
					
					vX = ((tmpCube.mass - tmpCubeB.mass)*vX+2 * tmpCubeB.mass*vXb)/
					(tmpCube.mass+tmpCubeB.mass);
					
					
					vXb = vTotal+vX;
					tmpCube.vX*=-1;
					tmpCubeB.vX*=-1;
					tmpCube.vY*=-1;
					tmpCubeB.vY*=-1;

					
				}
				
			};
			
			
			
		};
		setTimeout(animate,33);
		
	};
	animate();
	
	
	
	
	
	
	
	
});