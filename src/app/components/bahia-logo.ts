import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-bahia-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="inline-flex items-center gap-2.5 sm:gap-3 select-none">
      <!-- Bahia Prev Official Emblem Box -->
      <div
        class="bg-[#08183A] border border-blue-800/40 rounded-xl px-2.5 py-1.5 shadow-md flex flex-col justify-center items-start text-white leading-none"
        [class.w-[82px]]="size() === 'sm'"
        [class.w-[96px]]="size() === 'md'"
        [class.w-[114px]]="size() === 'lg'"
      >
        <span
          class="font-semibold text-slate-200 tracking-widest uppercase mb-0.5"
          [class.text-[8px]]="size() === 'sm'"
          [class.text-[9px]]="size() === 'md'"
          [class.text-[11px]]="size() === 'lg'"
        >
          PLANO
        </span>
        <div
          class="font-black tracking-tight uppercase flex items-center"
          [class.text-base]="size() === 'sm'"
          [class.text-lg]="size() === 'md'"
          [class.text-2xl]="size() === 'lg'"
        >
          <span>BAH</span>
          <!-- 'I' with distinctive red square dot -->
          <span class="inline-flex flex-col items-center relative">
            <span
              class="bg-[#E31B23] rounded-[1px] absolute"
              [class.w-[3.5px]]="size() === 'sm'"
              [class.h-[3.5px]]="size() === 'sm'"
              [class.-top-[4px]]="size() === 'sm'"
              [class.w-[4.5px]]="size() === 'md'"
              [class.h-[4.5px]]="size() === 'md'"
              [class.-top-[5px]]="size() === 'md'"
              [class.w-[6px]]="size() === 'lg'"
              [class.h-[6px]]="size() === 'lg'"
              [class.-top-[6px]]="size() === 'lg'"
            ></span>
            <span>I</span>
          </span>
          <span>A</span>
        </div>
        <div
          class="font-black tracking-tight uppercase text-white -mt-0.5"
          [class.text-base]="size() === 'sm'"
          [class.text-lg]="size() === 'md'"
          [class.text-2xl]="size() === 'lg'"
        >
          PREV
        </div>
      </div>

      <!-- Optional Slogan Tagline as shown in official brand asset -->
      @if (withTagline()) {
        <div class="flex flex-col text-left justify-center">
          <p class="text-[11px] sm:text-xs text-blue-100 font-normal leading-tight">
            Mais do que<br />
            um plano, é<br />
            <span class="font-bold text-white">cuidado para</span><br />
            <span class="font-bold text-white">toda a vida.</span>
          </p>
          <div class="w-7 h-[3px] bg-[#E31B23] rounded-full mt-1"></div>
        </div>
      }
    </div>
  `
})
export class BahiaLogo {
  public size = input<'sm' | 'md' | 'lg'>('md');
  public withTagline = input<boolean>(false);
}
