export interface IntentInterface {
  name: string;
  triggers: string[];
  answers: string[];
}

const generalIntents: IntentInterface[] = [
  {
    name: 'start',
    triggers: [],
    answers: [
      'Olá! Eu sou lúnis. Como posso ajudar?',
      'Oi. Como a lúnis aqui pode te ajudar hoje?'
    ]
  },
  {
    name: 'unsuported',
    triggers: [],
    answers: [
      'Seu navegador não suporta minha fala :(',
      'Não consigo falar por esse navegador :( ... AINDA!',
    ]
  },
  {
    name: 'unsuported-listening',
    triggers: [],
    answers: [
      'Seu navegador não suporta reconhecimento de fala :(',
      'Não consigo te ouvir nesse navegador :(',
      'Neste navegador, infelizmente não entendo fala :(',
    ]
  }
];

export const pickAnswer = (intent: IntentInterface) =>
  intent.answers[Math.floor(Math.random() * intent.answers.length)];

export default generalIntents;
