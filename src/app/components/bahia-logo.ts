import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-bahia-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="inline-flex items-center gap-3 select-none">
      <!-- Official Bahia Prev Logo Image (Exact brand image asset) -->
      <img
        src="logo-bahia-prev.png"
        alt="Logo Bahia Prev"
        class="shrink-0 rounded-2xl shadow-md border border-blue-400/20 object-contain"
        [class.w-[82px]]="size() === 'sm'"
        [class.h-[82px]]="size() === 'sm'"
        [class.w-[108px]]="size() === 'md'"
        [class.h-[108px]]="size() === 'md'"
        [class.w-[148px]]="size() === 'lg'"
        [class.h-[148px]]="size() === 'lg'"
      />

      <!-- Optional Tagline Slogan (Matches Image 2) -->
      @if (withTagline()) {
        <div class="flex flex-col text-left justify-center py-0.5">
          <p class="text-xs sm:text-[13px] text-blue-100 font-normal leading-snug">
            Mais do que<br />
            um plano, é<br />
            <strong class="font-bold text-white">cuidado para</strong><br />
            <strong class="font-bold text-white">toda a vida.</strong>
          </p>
          <div class="w-8 h-[3.5px] bg-[#E31B23] rounded-full mt-1.5"></div>
        </div>
      }
    </div>
  `
})
export class BahiaLogo {
  public size = input<'sm' | 'md' | 'lg'>('md');
  public withTagline = input<boolean>(false);
}

