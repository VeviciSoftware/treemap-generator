import { Paper, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const HowToUse = () => {
  return (
    <Paper sx={{ p: 2, flex: 1 }}>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, mb: 2 }}>
        Como usar?
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="1. Clique no botão Upload File e selecione um arquivo JSON ou XLSX." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. O corpo do arquivo deve seguir este exemplo:" />
        </ListItem>
      </List>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" component="div">
          JSON:
        </Typography>
        <Box component="img" src="/public/JSONExample.png" alt="Exemplo de arquivo JSON" sx={{ width: '100%', mt: 1, mb: 2 }} />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" component="div">
          XLSX:
        </Typography>
        <Box component="img" src="/public/XLSXExample.png" alt="Exemplo de arquivo XLSX" sx={{ width: '100%', mt: 1, mb: 2 }} />
      </Box>
      <Typography variant="body1" component="div" sx={{ mb: 2 }}>
        A 2° coluna determina a área do item no TreeMap e a 3° coluna determina a cor do item.
      </Typography>
      <Typography variant="body1" component="div">
        3. Com as informações carregadas, o TreeMap será gerado automaticamente.
      </Typography>
    </Paper>
  );
};

export default HowToUse;