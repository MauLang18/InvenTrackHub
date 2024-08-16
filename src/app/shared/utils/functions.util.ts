import { COLORS_BADGE } from './global-constants.util';

export function getStateBadge(label: string, tooltip?: string) {
  let generalCss =
    'max-w-24 overflow-hidden truncate text-center font-medium p-1.5 rounded-lg text-xs border m-auto ';

  if (label === 'PENDIENTE POR DIRECTOR') {
    label = 'P. POR DIRECTOR';
  }

  let badge = {
    tooltip,
    label,
    css: generalCss + COLORS_BADGE.main,
  };

  if (
    [
      'PUNTUAL',
      'PRESENCIAL',
      'ACTIVO',
      'APROBADO',
      'RENOVADO',
      'EXTRAS',
      'HORAS EXTRAS',
      'PERMISO POR DÍAS',
      'SIN SINTOMAS',
      'Enabled',
    ].includes(label)
  ) {
    badge.css = generalCss + COLORS_BADGE.green2;
  }

  if (
    ['TARDANZA', 'PENDIENTE', 'P. POR DIRECTOR', 'POR RENOVAR'].includes(label)
  ) {
    badge.css = generalCss + COLORS_BADGE.orange;
  }

  if (['SIN INFORMAR', 'ANULADO', 'ELIMINADO', 'INACTIVO'].includes(label)) {
    badge.css = generalCss + COLORS_BADGE.gray;
  }

  if (
    [
      'PERMISO',
      'REMOTO',
      'EXTERNO',
      'ANIVERSARIO',
      'CONTRATO INICIAL',
      'RECUPERACIÓN',
      'HORAS DE RECUPERACIÓN',
      'PERMISO POR HORAS',
    ].includes(label)
  ) {
    badge.css = generalCss + COLORS_BADGE.teal;
  }

  if (
    [
      'VACACIONES',
      'INTERNO',
      'MARCACIÓN EXTEMPORÁNEA',
      'HORARIO REGULAR',
    ].includes(label)
  ) {
    badge.css = generalCss + COLORS_BADGE.purple;
  }

  if (
    ['EN TOLERANCIA', 'CUMPLEAÑOS', 'AVANCE', 'HORAS DE AVANCE'].includes(label)
  ) {
    badge.css = generalCss + COLORS_BADGE.pink;
  }

  if (
    ['FALTA', 'CESADO', 'RECHAZADO', 'OBSERVADO', 'CON SINTOMAS'].includes(
      label
    )
  ) {
    badge.css = generalCss + COLORS_BADGE.red;
  }

  if (
    [
      'COMPENSACIÓN',
      'HORAS DE COMPENSACIÓN',
      'FERIADO',
      'PAUSA',
      'POR RENOVAR',
    ].includes(label)
  ) {
    badge.css = generalCss + COLORS_BADGE.yellow;
  }

  if (['CADUCADO', 'FUERA DE HORARIO'].includes(label)) {
    badge.css = generalCss + COLORS_BADGE.coral;
  }

  if (label == undefined) {
    badge.css = 'hidden';
  }

  return badge;
}

export function getIcon(
  iconName: string,
  tooltip: string,
  permission: boolean,
  action?: string
) {
  let generalCss = 'flex justify-center items-center p-1.5 w-fit rounded-full ';

  let iconObj: any = {
    tooltip: null,
    icon: null,
    css: null,
    action: null,
  };

  if (permission) {
    iconObj = {
      tooltip,
      icon: '',
      css: generalCss + COLORS_BADGE.main,
      action: action ? action : null,
    };

    if (['icToday', 'icDownload', 'icCloudDownload'].includes(iconName)) {
      iconObj.css = generalCss + COLORS_BADGE.green;
    }

    if (['icSchedule', 'icSettingsBackupRestore'].includes(iconName)) {
      iconObj.css = generalCss + COLORS_BADGE.teal;
    }

    if (['icFlight'].includes(iconName)) {
      iconObj.css = generalCss + COLORS_BADGE.purple;
    }

    if (['icChatBubble', 'icContentCopy'].includes(iconName)) {
      iconObj.css = generalCss + COLORS_BADGE.orange;
    }

    if (['icRemoveCircleOutline', 'icReport', 'icDelete'].includes(iconName)) {
      iconObj.css = generalCss + COLORS_BADGE.red;
    }

    if (['icFileCopy'].includes(iconName)) {
      iconObj.css = generalCss + COLORS_BADGE.yellow;
    }

    if (['icWhatsapp'].includes(iconName)) {
      iconObj.css = generalCss + COLORS_BADGE.whatsapp;
    }
  }

  return iconObj;
}
