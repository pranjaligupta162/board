import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

	height=0;
	width=0;
	totGrid=0;
	curNum=1;
	rowIdx=0;
	centerBox=0;
	pickItems=[];
	boxArr=[];
	totSteps=0;
	gameOver='N';
  constructor() { }

  ngOnInit() {
  	this.getDimension();
  }

  getDimension(){
  	let fheight = Number(prompt("Please enter height"));
  	let fwidth = Number(prompt("Please enter width"));
  	this.totGrid=fheight*fwidth;

  	let wd=Math.ceil(fwidth/2);
  	let ht=Math.ceil(fheight/2);
  	this.centerBox = fwidth*(ht-1)+wd;

  	let arr=this.getArray(this.totGrid);
  	arr = arr.sort(() => Math.random() - 0.5);
  	let totPicks = Math.ceil((fheight+fwidth)/2);
  	
	for (let a of arr) {
		if(this.pickItems.length==totPicks)
			break;
		if(a!=this.centerBox){
	  		this.pickItems.push(a);
		}
	  	arr.shift();
	}
	this.boxArr=this.getArray(this.totGrid);
	this.height=fheight;
  	this.width=fwidth;
  }
  
  getArray(n: number){
  	return [...Array(n).keys()].map(i => i + 1);
  }

  chkPicks(num:number){
  	if(this.pickItems.indexOf(num) > -1)
  		return true;
  	else
  		return false;
  }

  moveHero(e:any){
  	const activeEle = <HTMLInputElement>document.activeElement;
  	
  	if(this.gameOver=='Y' || e.target.classList.value.indexOf('hero')<0)
  		return;
  	const activeEleIndex = Array.prototype.indexOf.call(document.querySelectorAll('.grid-box'), activeEle);
    
    if(e.key == "ArrowRight" && activeEle.nextElementSibling!=null ) {
    	activeEle.classList.remove('hero');
      activeEle.nextElementSibling.classList.remove('picks');
    	activeEle.nextElementSibling.classList.add('hero');
      const input: HTMLInputElement = activeEle.nextElementSibling as HTMLInputElement;
      input.focus();
    } 

    if(e.key == "ArrowLeft" && activeEle.previousElementSibling!=null) {
    	activeEle.classList.remove('hero');
        activeEle.previousElementSibling.classList.remove('picks');
        activeEle.previousElementSibling.classList.add('hero');
        const input: HTMLInputElement = activeEle.previousElementSibling as HTMLInputElement;
        input.focus();
    }

    if(e.key == "ArrowUp" && document.querySelectorAll('.grid-box')[activeEleIndex-this.width]!=null) {
    	activeEle.classList.remove('hero');
        document.querySelectorAll('.grid-box')[activeEleIndex-this.width].classList.remove('picks');
        document.querySelectorAll('.grid-box')[activeEleIndex-this.width].classList.add('hero');
        const input: HTMLInputElement = document.querySelectorAll('.grid-box')[activeEleIndex-this.width] as HTMLInputElement;
        input.focus();
    }

    if(e.key == "ArrowDown" && document.querySelectorAll('.grid-box')[activeEleIndex+this.width]!=null) {
    	activeEle.classList.remove('hero');
        document.querySelectorAll('.grid-box')[activeEleIndex+this.width].classList.remove('picks');
        document.querySelectorAll('.grid-box')[activeEleIndex+this.width].classList.add('hero');
       	const input: HTMLInputElement = document.querySelectorAll('.grid-box')[activeEleIndex+this.width] as HTMLInputElement;
        input.focus();
    }

    this.totSteps++;
    if(document.querySelectorAll('.picks').length==0){
    	this.gameOver='Y';
        alert(`Total Steps taken - ${this.totSteps}`);
    }
  }
}