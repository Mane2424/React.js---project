type DataRow = (string | number)[];

export const arrayToCSV = (arr: DataRow[]): string => {
  const csvContent = arr.map(row => {
    return row.map(cell => {
      if (typeof cell === 'string' && /[,"]/.test(cell)) {
        // If the cell is a string and contains a comma or double quote, enclose it in double quotes and escape any double quotes inside it
        return `"${cell.replace(/"/g, '""')}"`;
      } else {
        return cell;
      }
    }).join(',');
  }).join('\n');
  return `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
};