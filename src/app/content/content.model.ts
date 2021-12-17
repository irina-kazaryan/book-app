export const RATINGS = [1, 2, 3, 4, 5];

export enum Status {
  ToRead = 'ToRead',
  ReadingNow = 'ReadingNow',
  HaveRead ='HaveRead'
}

export enum WhenToStartReading {
  Today = 'Today',
  Tomorrow = 'Tomorrow',
  TheDayAfterTomorrow = 'TheDayAfterTomorrow',
  ThisWeek = 'ThisWeek',
  ThisMonth = 'ThisMonth',
  ThisYear = 'ThisYear',
}

export interface WhenToStartReadingSelect {
  label: string;
  value: WhenToStartReading;
}

export const WHEN_TO_START_READING: WhenToStartReadingSelect[] = [
  {
    label: 'content.TODAY',
    value: WhenToStartReading.Today,
  },
  {
    label: 'content.TOMORROW',
    value: WhenToStartReading.Tomorrow,
  },
  {
    label: 'content.THE_DAY_AFTER_TOMORROW',
    value: WhenToStartReading.TheDayAfterTomorrow,
  },
  {
    label: 'content.THIS_WEEK',
    value: WhenToStartReading.ThisWeek,
  },
  {
    label: 'content.THIS_MONTH',
    value: WhenToStartReading.ThisMonth,
  },
  {
    label: 'content.THIS_YEAR',
    value: WhenToStartReading.ThisYear,
  },
];

export const FORM_RESET_EVENT_KEY = 'FORM_RESET';
