import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './comps/board/board.component';

const routes: Routes = [
	{
    	path: '',
		component:BoardComponent
 	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const comps =[BoardComponent];