export function isLabelPresent(label: string, prLabels: string[]): boolean {
  return prLabels.some(prl => prl === label);
}

export function allLabelsPresent(labels: string[], prLabels: string[]): boolean {
  return labels.every(label => isLabelPresent(label, prLabels));
}

export function isLabelAbsent(label: string, prLabels: string[]): boolean {
  return prLabels.every(prl => prl !== label);
}

export function allLabelsAbsent(labels: string[], prLabels: string[]): boolean {
  return labels.every(label => isLabelAbsent(label, prLabels));
}