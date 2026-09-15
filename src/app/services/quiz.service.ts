import { Injectable } from '@angular/core';
import { PlanDetail, PlanType, QuizAnswers, QuizQuestion } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public readonly WHATSAPP_PHONE = '5574998072942';
  public readonly WHATSAPP_DISPLAY = '(74) 99807-2942';

  public readonly questions: QuizQuestion[] = [
    {
      id: 1,
      badge: 'PERGUNTA 1',
      icon: 'groups',
      title: 'Pensando na sua família, quantas pessoas você gostaria de incluir na sua proteção?',
      titleHighlight: 'quantas pessoas',
      options: [
        { id: 'ate_3', label: 'Até 3 pessoas' },
        { id: 'ate_6', label: 'Até 6 pessoas' },
        { id: 'ate_8', label: 'Até 8 pessoas' },
        { id: 'ate_10', label: 'Até 10 pessoas' },
        { id: 'nao_sei', label: 'Ainda não sei' }
      ]
    },
    {
      id: 2,
      badge: 'PERGUNTA 2',
      icon: 'verified_user',
      title: 'Além da assistência familiar, quais desses benefícios você gostaria de ter?',
      subtitle: 'Você pode selecionar mais de uma opção',
      isMultiple: true,
      options: [
        { id: 'limpeza', label: 'Limpeza odontológica simples' },
        { id: 'restauracao', label: 'Restauração odontológica simples' },
        { id: 'extracao', label: 'Extração odontológica simples' },
        { id: 'telemedicina', label: 'Telemedicina 24h' },
        { id: 'descontos', label: 'Descontos em parceiros e estabelecimentos' },
        { id: 'varios', label: 'Quero ter acesso a vários desses benefícios' }
      ]
    },
    {
      id: 3,
      badge: 'PERGUNTA 3',
      icon: 'medical_services',
      title: 'Ter acesso à Telemedicina 24h faria diferença para você e sua família?',
      options: [
        { id: 'muito_util', label: 'Sim, seria muito útil' },
        { id: 'dia_a_dia', label: 'Sim, principalmente para situações do dia a dia' },
        { id: 'conhecer', label: 'Talvez, gostaria de conhecer melhor' },
        { id: 'nao_procuro', label: 'Não é algo que procuro no momento' }
      ]
    },
    {
      id: 4,
      badge: 'PERGUNTA 4',
      icon: 'shield',
      title: 'Quando você pensa em proteger sua família, o que é mais importante para você?',
      options: [
        { id: 'essencial', label: 'Uma proteção essencial' },
        { id: 'familia_beneficios', label: 'Proteção para a família + benefícios no dia a dia' },
        { id: 'completa', label: 'Uma proteção mais completa, com mais benefícios' },
        { id: 'nao_sei_escolher', label: 'Ainda não sei qual opção escolher' }
      ]
    },
    {
      id: 5,
      badge: 'PERGUNTA 5',
      icon: 'thumb_up',
      title: 'Se encontrássemos uma opção que combina com as necessidades da sua família e cabe no seu orçamento, você gostaria de conhecer?',
      options: [
        { id: 'quero_conhecer', label: 'Sim, quero conhecer' },
        { id: 'quero_falar', label: 'Sim, quero falar com a Bahia Prev' },
        { id: 'entender_antes', label: 'Quero entender melhor antes de decidir' },
        { id: 'pesquisando', label: 'Ainda estou pesquisando' }
      ]
    }
  ];

  public readonly plans: Record<PlanType, PlanDetail> = {
    esmeralda: {
      id: 'esmeralda',
      name: 'PLANO ESMERALDA',
      tagline: 'Seu perfil combina com o Plano Esmeralda 💙',
      badgeEmoji: '💙',
      price: 40,
      beneficiaries: 'Até 6 beneficiários',
      highlights: [
        'Assistência familiar',
        'Procedimentos odontológicos para 1 dependente',
        'Limpeza simples',
        'Restauração simples',
        'Extração simples',
        'Traslado de até 300 km',
        'Até 3 dependentes extras'
      ],
      note: 'Telemedicina pode ser adicionada sob demanda.',
      themeColor: '#005f73',
      accentBg: 'bg-sky-50',
      borderColor: 'border-sky-500',
      badgeColor: 'bg-sky-100 text-sky-800',
      whatsappMessage: 'Olá! Fiz o quiz da Bahia Prev e gostaria de conhecer as condições para minha família.',
      buttonLabel: 'FALAR COM A BAHIA PREV'
    },
    diamante: {
      id: 'diamante',
      name: 'PLANO DIAMANTE',
      tagline: 'Seu perfil combina com o Plano Diamante 💎',
      badgeEmoji: '💎',
      price: 50,
      beneficiaries: 'Até 8 beneficiários',
      highlights: [
        'Assistência familiar',
        'Procedimentos odontológicos para até 3 dependentes',
        'Limpeza simples',
        'Restauração simples',
        'Extração simples',
        'Traslado de até 500 km',
        'Até 3 dependentes adicionais',
        'Telemedicina gratuita para o titular'
      ],
      note: 'Telemedicina inclusa para o titular.',
      themeColor: '#0a369d',
      accentBg: 'bg-blue-50',
      borderColor: 'border-blue-600',
      badgeColor: 'bg-blue-100 text-blue-900',
      whatsappMessage: 'Olá! Fiz o quiz da Bahia Prev e gostaria de conhecer as condições para minha família.',
      buttonLabel: 'FALAR COM A BAHIA PREV'
    },
    rubi: {
      id: 'rubi',
      name: 'PLANO RUBI',
      tagline: 'Seu perfil combina com o Plano Rubi ❤️',
      badgeEmoji: '❤️',
      price: 60,
      beneficiaries: 'Até 10 beneficiários',
      highlights: [
        'Assistência familiar',
        'Procedimentos odontológicos para até 6 dependentes',
        'Limpeza simples',
        'Restauração simples',
        'Extração simples',
        'Traslado ilimitado em todo o Estado da Bahia',
        'Até 3 dependentes adicionais',
        'Telemedicina gratuita para o titular + 1 dependente fixo'
      ],
      note: 'Telemedicina inclusa para titular + 1 dependente fixo.',
      themeColor: '#c9184a',
      accentBg: 'bg-rose-50',
      borderColor: 'border-rose-600',
      badgeColor: 'bg-rose-100 text-rose-900',
      whatsappMessage: 'Olá! Fiz o quiz da Bahia Prev e gostaria de conhecer as condições para minha família.',
      buttonLabel: 'FALAR COM A BAHIA PREV'
    }
  };

  /**
   * Determine the most suitable plan according to the 5 answers:
   * 1. Q1: Beneficiaries size
   * 2. Q2: Interest in dental & telemedicina benefits
   * 3. Q3: Importance of 24h Telemedicina
   * 4. Q4: Priority (essential, family+benefits, complete)
   * 5. Q5: Interest and readiness
   */
  public calculateRecommendation(answers: QuizAnswers): PlanType {
    // 1. Strict capacity constraints:
    // If they need up to 10 people -> Only Rubi supports 10 beneficiaries
    if (answers.q1_beneficiaries === 'ate_10') {
      return 'rubi';
    }

    // If they need up to 8 people -> Esmeralda only supports up to 6, so must be Diamante or Rubi
    if (answers.q1_beneficiaries === 'ate_8') {
      if (answers.q4_priority === 'completa' || answers.q2_benefits.includes('varios') || answers.q2_benefits.length >= 4) {
        return 'rubi';
      }
      return 'diamante';
    }

    // Scoring matrix
    let esmeraldaScore = 0;
    let diamanteScore = 0;
    let rubiScore = 0;

    // Q1: People
    switch (answers.q1_beneficiaries) {
      case 'ate_3':
        esmeraldaScore += 4;
        diamanteScore += 2;
        break;
      case 'ate_6':
        esmeraldaScore += 4;
        diamanteScore += 3;
        break;
      case 'nao_sei':
        diamanteScore += 2;
        esmeraldaScore += 2;
        rubiScore += 1;
        break;
    }

    // Q2: Benefits
    const benefitsCount = answers.q2_benefits.length;
    const hasVarios = answers.q2_benefits.includes('varios');
    const hasTelemedicina = answers.q2_benefits.includes('telemedicina');

    if (hasVarios || benefitsCount >= 4) {
      rubiScore += 4;
      diamanteScore += 3;
    } else if (benefitsCount >= 2) {
      diamanteScore += 4;
      rubiScore += 2;
      esmeraldaScore += 1;
    } else {
      esmeraldaScore += 3;
      diamanteScore += 1;
    }

    if (hasTelemedicina) {
      diamanteScore += 3;
      rubiScore += 3;
    }

    // Q3: Telemedicina 24h
    switch (answers.q3_telemedicina) {
      case 'muito_util':
      case 'dia_a_dia':
        diamanteScore += 4;
        rubiScore += 4;
        break;
      case 'conhecer':
        diamanteScore += 2;
        esmeraldaScore += 2;
        break;
      case 'nao_procuro':
        // Esmeralda does not include Telemedicina, keeping it at lowest cost (R$ 40)
        esmeraldaScore += 5;
        break;
    }

    // Q4: Priority (Heavy weight)
    switch (answers.q4_priority) {
      case 'essencial':
        esmeraldaScore += 7;
        break;
      case 'familia_beneficios':
        diamanteScore += 7;
        break;
      case 'completa':
        rubiScore += 8;
        break;
      case 'nao_sei_escolher':
        diamanteScore += 3; // best balanced default
        break;
    }

    // Q5: Intent
    switch (answers.q5_interest) {
      case 'quero_conhecer':
      case 'quero_falar':
        diamanteScore += 1;
        rubiScore += 1;
        break;
      case 'entender_antes':
      case 'pesquisando':
        esmeraldaScore += 1;
        diamanteScore += 1;
        break;
    }

    // Specific user profile matching:
    // If user explicitly chose "Uma proteção essencial" and doesn't prioritize Telemedicine or 8+ people:
    if (answers.q4_priority === 'essencial' && answers.q3_telemedicina !== 'muito_util' && answers.q1_beneficiaries !== 'ate_8') {
      return 'esmeralda';
    }

    // Compare scores
    if (rubiScore > diamanteScore && rubiScore > esmeraldaScore) {
      return 'rubi';
    }
    if (esmeraldaScore > diamanteScore && esmeraldaScore > rubiScore) {
      return 'esmeralda';
    }

    // Default high-satisfaction balanced plan
    return 'diamante';
  }

  /**
   * Translates option IDs into human-readable labels
   */
  public getAnswerLabel(questionId: number, optionId: string): string {
    const question = this.questions.find(q => q.id === questionId);
    if (!question) return optionId;
    const option = question.options.find(o => o.id === optionId);
    return option ? option.label : optionId;
  }

  /**
   * Translates an array of option IDs into readable comma-separated labels
   */
  public getMultipleAnswerLabels(questionId: number, optionIds: string[]): string {
    if (!optionIds || optionIds.length === 0) return 'Nenhum selecionado';
    return optionIds
      .map(id => this.getAnswerLabel(questionId, id))
      .join(', ');
  }

  /**
   * Generates a beautifully formatted form message for WhatsApp
   */
  public generateFormWhatsAppMessage(plan: PlanDetail, answers?: QuizAnswers): string {
    if (!answers) {
      return plan.whatsappMessage;
    }

    const q1Label = this.getAnswerLabel(1, answers.q1_beneficiaries);
    const q2Labels = answers.q2_benefits && answers.q2_benefits.length > 0
      ? answers.q2_benefits.map(id => `• ${this.getAnswerLabel(2, id)}`).join('\n')
      : '• Assistência familiar básica';
    const q3Label = this.getAnswerLabel(3, answers.q3_telemedicina);
    const q4Label = this.getAnswerLabel(4, answers.q4_priority);
    const q5Label = this.getAnswerLabel(5, answers.q5_interest);

    return [
      '📋 *FORMULÁRIO DO QUIZ - BAHIA PREV*',
      '━━━━━━━━━━━━━━━━━━━━',
      '👨‍👩‍👧‍👦 *1. Quantidade de pessoas:*',
      `${q1Label}`,
      '',
      '✨ *2. Benefícios desejados:*',
      `${q2Labels}`,
      '',
      '🩺 *3. Interesse em Telemedicina 24h:*',
      `${q3Label}`,
      '',
      '🛡️ *4. O que é mais importante:*',
      `${q4Label}`,
      '',
      '🤝 *5. Disponibilidade para conhecer:*',
      `${q5Label}`,
      '━━━━━━━━━━━━━━━━━━━━',
      '🎯 *Perfil de proteção sugerido:*',
      `*${plan.name}* (${plan.beneficiaries})`,
      '━━━━━━━━━━━━━━━━━━━━',
      'Olá! Acabei de responder o quiz no site da Bahia Prev e gostaria de falar com um atendente para receber a melhor proposta para a minha família!'
    ].join('\n');
  }

  /**
   * Build WhatsApp URL with formatted form message
   */
  public getWhatsAppUrl(plan: PlanDetail, answers?: QuizAnswers): string {
    const rawMessage = this.generateFormWhatsAppMessage(plan, answers);
    const encodedText = encodeURIComponent(rawMessage);
    return `https://wa.me/${this.WHATSAPP_PHONE}?text=${encodedText}`;
  }
}
