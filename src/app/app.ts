import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BahiaLogo } from './components/bahia-logo';
import { PlanDetail, PlanType, QuizAnswers, QuizQuestion } from './models/quiz.model';
import { QuizService } from './services/quiz.service';
import { TrackingService } from './services/tracking.service';

type QuizScreen = 'intro' | 'question' | 'analyzing' | 'result';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, BahiaLogo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  public readonly quizService = inject(QuizService);
  public readonly trackingService = inject(TrackingService);

  // Screen State
  public currentScreen = signal<QuizScreen>('intro');
  public currentQuestionIndex = signal<number>(0);

  // User Answers
  public selectedBeneficiaries = signal<string>('');
  public selectedBenefits = signal<string[]>([]);
  public selectedTelemedicina = signal<string>('');
  public selectedPriority = signal<string>('');
  public selectedInterest = signal<string>('');

  // Analysis Animation state
  public analysisStep = signal<number>(0);
  public isReadyMessage = signal<boolean>(false);

  // Result state
  public recommendedPlanType = signal<PlanType>('diamante');
  public showAllPlans = signal<boolean>(false);
  public activeComparisonTab = signal<PlanType>('diamante');

  // Computed Values
  public questions = this.quizService.questions;

  public currentQuestion = computed<QuizQuestion>(() => {
    const idx = this.currentQuestionIndex();
    return this.questions[idx] || this.questions[0];
  });

  public progressNumber = computed<number>(() => {
    return this.currentQuestionIndex() + 1;
  });

  public progressPercent = computed<number>(() => {
    return ((this.currentQuestionIndex() + 1) / 5) * 100;
  });

  public isCurrentQuestionValid = computed<boolean>(() => {
    const qIndex = this.currentQuestionIndex();
    switch (qIndex) {
      case 0:
        return !!this.selectedBeneficiaries();
      case 1:
        return this.selectedBenefits().length > 0;
      case 2:
        return !!this.selectedTelemedicina();
      case 3:
        return !!this.selectedPriority();
      case 4:
        return !!this.selectedInterest();
      default:
        return false;
    }
  });

  public recommendedPlan = computed<PlanDetail>(() => {
    const type = this.recommendedPlanType();
    return this.quizService.plans[type];
  });

  public comparisonPlans = computed<PlanDetail[]>(() => {
    return [
      this.quizService.plans.esmeralda,
      this.quizService.plans.diamante,
      this.quizService.plans.rubi
    ];
  });

  public currentAnswers = computed<QuizAnswers>(() => {
    return {
      q1_beneficiaries: this.selectedBeneficiaries(),
      q2_benefits: this.selectedBenefits(),
      q3_telemedicina: this.selectedTelemedicina(),
      q4_priority: this.selectedPriority(),
      q5_interest: this.selectedInterest()
    };
  });

  public answerLabels = computed(() => {
    const answers = this.currentAnswers();
    return {
      q1: this.quizService.getAnswerLabel(1, answers.q1_beneficiaries),
      q2: answers.q2_benefits.map(id => this.quizService.getAnswerLabel(2, id)),
      q3: this.quizService.getAnswerLabel(3, answers.q3_telemedicina),
      q4: this.quizService.getAnswerLabel(4, answers.q4_priority),
      q5: this.quizService.getAnswerLabel(5, answers.q5_interest)
    };
  });

  ngOnInit(): void {
    // Initial page tracking
    const utms = this.trackingService.getUtms();
    if (Object.keys(utms).length > 0) {
      console.info('[Bahia Prev UTMs]', utms);
    }
  }

  public startQuiz(): void {
    this.currentScreen.set('question');
    this.currentQuestionIndex.set(0);
    this.trackingService.trackEvent('quiz_started');
    this.trackingService.trackEvent('quiz_question_1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public selectSingleOption(optionId: string): void {
    const qIndex = this.currentQuestionIndex();
    switch (qIndex) {
      case 0:
        this.selectedBeneficiaries.set(optionId);
        break;
      case 2:
        this.selectedTelemedicina.set(optionId);
        break;
      case 3:
        this.selectedPriority.set(optionId);
        break;
      case 4:
        this.selectedInterest.set(optionId);
        break;
    }
  }

  public isOptionSelected(optionId: string): boolean {
    const qIndex = this.currentQuestionIndex();
    switch (qIndex) {
      case 0:
        return this.selectedBeneficiaries() === optionId;
      case 1:
        return this.selectedBenefits().includes(optionId);
      case 2:
        return this.selectedTelemedicina() === optionId;
      case 3:
        return this.selectedPriority() === optionId;
      case 4:
        return this.selectedInterest() === optionId;
      default:
        return false;
    }
  }

  public toggleBenefit(benefitId: string): void {
    const current = this.selectedBenefits();
    
    // If selecting "varios", either check all or toggle
    if (benefitId === 'varios') {
      if (current.includes('varios')) {
        this.selectedBenefits.set([]);
      } else {
        const allIds = this.quizService.questions[1].options.map(o => o.id);
        this.selectedBenefits.set(allIds);
      }
      return;
    }

    if (current.includes(benefitId)) {
      const updated = current.filter(id => id !== benefitId && id !== 'varios');
      this.selectedBenefits.set(updated);
    } else {
      const updated = [...current, benefitId];
      // If all individual items selected, also check varios
      const individualIds = this.quizService.questions[1].options.filter(o => o.id !== 'varios').map(o => o.id);
      const hasAll = individualIds.every(id => updated.includes(id));
      if (hasAll && !updated.includes('varios')) {
        updated.push('varios');
      }
      this.selectedBenefits.set(updated);
    }
  }

  public nextQuestion(): void {
    if (!this.isCurrentQuestionValid()) return;

    const currentIdx = this.currentQuestionIndex();

    if (currentIdx < 4) {
      const nextIdx = currentIdx + 1;
      this.currentQuestionIndex.set(nextIdx);
      this.trackingService.trackEvent(`quiz_question_${nextIdx + 1}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed all 5 questions
      this.finishQuiz();
    }
  }

  public previousQuestion(): void {
    const currentIdx = this.currentQuestionIndex();
    if (currentIdx > 0) {
      this.currentQuestionIndex.set(currentIdx - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.currentScreen.set('intro');
    }
  }

  private finishQuiz(): void {
    this.currentScreen.set('analyzing');
    this.analysisStep.set(1);
    this.isReadyMessage.set(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.trackingService.trackEvent('quiz_completed', {
      q1: this.selectedBeneficiaries(),
      q2_count: this.selectedBenefits().length,
      q3: this.selectedTelemedicina(),
      q4: this.selectedPriority(),
      q5: this.selectedInterest()
    });

    // Compile answers
    const answers: QuizAnswers = {
      q1_beneficiaries: this.selectedBeneficiaries(),
      q2_benefits: this.selectedBenefits(),
      q3_telemedicina: this.selectedTelemedicina(),
      q4_priority: this.selectedPriority(),
      q5_interest: this.selectedInterest()
    };

    // Calculate plan
    const recommended = this.quizService.calculateRecommendation(answers);
    this.recommendedPlanType.set(recommended);
    this.activeComparisonTab.set(recommended);

    // Step-by-step loading animation
    setTimeout(() => {
      this.analysisStep.set(2);
    }, 700);

    setTimeout(() => {
      this.analysisStep.set(3);
    }, 1400);

    setTimeout(() => {
      this.isReadyMessage.set(true);
    }, 1900);

    setTimeout(() => {
      this.currentScreen.set('result');
      this.trackingService.trackEvent(`result_${recommended}`, {
        plan: recommended,
        price: this.quizService.plans[recommended].price
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  }

  public openWhatsApp(plan?: PlanDetail): void {
    const targetPlan = plan || this.recommendedPlan();
    this.trackingService.trackEvent('whatsapp_click', {
      plan: targetPlan.id,
      phone: this.quizService.WHATSAPP_PHONE
    });

    const url = this.quizService.getWhatsAppUrl(targetPlan, this.currentAnswers());
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  public restartQuiz(): void {
    this.selectedBeneficiaries.set('');
    this.selectedBenefits.set([]);
    this.selectedTelemedicina.set('');
    this.selectedPriority.set('');
    this.selectedInterest.set('');
    this.currentQuestionIndex.set(0);
    this.showAllPlans.set(false);
    this.currentScreen.set('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public toggleComparison(): void {
    this.showAllPlans.update(v => !v);
  }

  public setComparisonTab(tab: PlanType): void {
    this.activeComparisonTab.set(tab);
  }
}
