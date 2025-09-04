import { Card, CardContent, CardHeader, Typography, CircularProgress, Box, Alert } from '@mui/material';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useTreeViewData } from '../api/hooks';

export default function TreeViewCard() {
  const { data: treeData, loading, error } = useTreeViewData();

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader 
        title={
          <Typography variant="h6" component="h3">
            Site Structure
          </Typography>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px' 
          }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">
            Error loading tree view data: {error}
          </Alert>
        ) : (
          <RichTreeView
            items={treeData || []}
            aria-label="site structure"
            multiSelect
            defaultExpandedItems={['1', '1.1']}
            defaultSelectedItems={['1.1', '1.1.1']}
            sx={{
              m: '0 -8px',
              pb: '8px',
              height: 'fit-content',
              flexGrow: 1,
              overflowY: 'auto',
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
