import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PigFormComponent } from './pig-form/pig-form.component';
import { MoreinfoComponent } from './moreinfo/moreinfo.component';
import { DeleteComponent } from './delete/delete.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "add-pig", component: PigFormComponent},
  { path: "moreinfo", component: MoreinfoComponent},
  { path: "delete", component: DeleteComponent},
  { path: "status", component: StatusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
