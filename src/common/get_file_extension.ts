
/**
 * Получает расширение файла по его пути
 */
export const get_file_extension = (file_name: string) => 
{
  for(let i = file_name.length - 1; i >= 0; i--)
  {
    if(file_name[i] == '.')
    {
      if(i == file_name.length - 1)
      {
        return '';
      }

      return file_name.slice(i + 1, file_name.length);
    }
  }

  return '';
};