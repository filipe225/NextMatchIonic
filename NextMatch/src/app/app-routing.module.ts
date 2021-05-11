import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const routes: Routes = [
	{
		path: 'home',
		loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
        path: 'matches',
        loadChildren: () => import('./pages/matches/matches.module').then( m => m.MatchesPageModule),
        canActivate: [AngularFireAuthGuard]
	},
    {
        path: 'teams',
        loadChildren: () => import('./pages/teams/teams.module').then( m => m.TeamsPageModule),
        canActivate: [AngularFireAuthGuard]
    },
    {
        path: 'user-settings',
        loadChildren: () => import('./pages/user-settings/user-settings.module').then( m => m.UserSettingsPageModule),
        canActivate: [AngularFireAuthGuard]
    },
    {
        path: 'matches-offline',
        loadChildren: () => import('./pages/matches-offline/matches-offline.module').then( m => m.MatchesOfflinePageModule),
        canActivate: [AngularFireAuthGuard]
    },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
