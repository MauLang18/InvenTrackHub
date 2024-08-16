export enum STATUS {
  ACTIVO = 1,
  INACTIVO = 0,
}

export enum SPLIT_BUTTON_ACTIONS {
  ACTUALIZAR_DATOS = 1,
  REFRESCAR_FILTROS = 2,
}

export const languages = [
  {
    language: 'English',
    flag: 'us',
  },
  {
    language: 'French',
    flag: 'france',
  },
  {
    language: 'German',
    flag: 'germany',
  },
  {
    language: 'Russian',
    flag: 'russia',
  },
  {
    language: 'Spanish',
    flag: 'spain',
  },
];

export const notifications = [
  {
    icon: 'fal fa-cloud-download',
    subject: 'Download complete',
    description: 'Lorem ipsum dolor sit amet, consectetuer.',
  },
  {
    icon: 'fal fa-cloud-upload',
    subject: 'Upload complete',
    description: 'Lorem ipsum dolor sit amet, consectetuer.',
  },
  {
    icon: 'fal fa-trash',
    subject: '350 MB trash files',
    description: 'Lorem ipsum dolor sit amet, consectetuer.',
  },
];

export const userItems = [
  {
    icon: 'fal fa-user',
    label: 'Profile',
  },
  {
    icon: 'fal fa-cog',
    label: 'Settings',
  },
  {
    icon: 'fal fa-unlock-alt',
    label: 'Lock screen',
  },
  {
    icon: 'fal fa-power-off',
    label: 'Logout',
  },
];

export enum COLORS_BADGE {
  main = 'text-am-main-blue bg-am-main-blue-light border-am-main-blue',
  main_dark = 'text-white bg-am-main-blue border-am-main-blue',
  green = 'text-am-new-green-dark bg-am-new-green-light border-am-new-green-dark',
  green2 = 'text-am-new-green-dark bg-am-new-green border-am-new-green-dark',
  orange = 'text-am-new-orange-dark bg-am-new-orange-light border-am-new-orange-dark',
  gray = 'text-am-gray-dark bg-am-gray-light border-am-gray-dark',
  teal = 'text-am-teal-dark bg-am-teal-light border-am-teal-dark',
  purple = 'text-am-new-purple-dark bg-am-new-purple-light border-am-new-purple-dark',
  red = 'text-am-new-red-dark bg-am-new-red-light border-am-new-red-dark',
  yellow = 'text-am-new-yellow-dark bg-am-new-yellow-light border-am-new-yellow-dark',
  pink = 'text-am-new-pink-dark bg-am-new-pink-light border-am-new-pink-dark',
  coral = 'text-am-coral-dark bg-am-coral-light border-am-coral-dark',
  whatsapp = 'text-white bg-am-new-green border-am-new-green',
}
