class Ship{
  constructor (){
    
    this.pos=createVector(width/2,height*0.9);
    if(!isPC){this.w=width/4;}
    else{
    this.w=height/4;
    }
    this.h=this.w/3.5;
    this.vel=0
    }
  update(){
 //   let force=mouseX-this.pos.x;
 //   this.vel=mouseX-this.pos.x;
 //   force*=0.1;
 //   this.vel+=force;
 //   this.vel*=0.65;
 if(mouseX>0 && mouseX<width){
  //  this.pos.x+=this.vel;
    this.pos.x=mouseX;
   }
    }
  render(){
 //   fill(0,100);
//    stroke(0);
    
  //  rect(this.pos.x,this.pos.y,this.w,this.h);
    image(shipimg[0],this.pos.x,this.pos.y,this.w,this.h);
    
    }
  
  }