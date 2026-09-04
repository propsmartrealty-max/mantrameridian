/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    geo: {
      country: string;
      city: string;
      region: string;
      colo: string;
      ray: string;
      isNRI: boolean;
    };
  }
}
