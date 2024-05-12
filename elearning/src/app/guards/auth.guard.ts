import { CanActivateFn, Router } from '@angular/router';
import {inject } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { CloudService } from '../services/cloud.service';

export const authGuard: CanActivateFn = (route, state) => {
  console.log(route, state.root.children);
  const router = inject(Router);
  const us = inject(UtilityService);
  const cloudSer = inject(CloudService);
  console.log("TOKEN", us.getToken())
  if (cloudSer.isAuth() && us.getToken()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
  
  return true;
};
