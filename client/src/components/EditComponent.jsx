import { useState } from 'react';
import Box from '@mui/material/Box';
import { Stack, Typography, Container } from '@mui/material';
import { Colors } from '../styles';
import Button from '@mui/material/Button';
import Credit from './Editing/Credit';
import DepoEdit from './Editing/DepoEdit';
import Income from './Editing/Income';
import Purchases from './Editing/Purchases';

function EditComponent() {
  const [activeButton, setActiveButton] = useState('Кредит');
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <>
      <Typography
        fontFamily={'Rowdies, sans-serif'}
        fontSize='28px'
        fontWeight={700}
        textAlign={'center'}
        color={Colors.white}
        marginBottom='30px'
      >
        Редагування
      </Typography>
      <Container
        sx={{ display: 'flex', justifyContent: 'center', marginBottom: '55px' }}
      >
        <Stack direction='row'>
          <Button
            color={activeButton === 'Кредит' ? 'primary' : 'fourth'}
            sx={{
              backgroundColor: activeButton === 'Кредит' ? 'white' : '',
            }}
            onClick={() => {
              handleButtonClick('Кредит');
            }}
          >
            Кредит
          </Button>
          <Button
            color={activeButton === 'Депозит' ? 'primary' : 'fourth'}
            sx={{ backgroundColor: activeButton === 'Депозит' ? 'white' : '' }}
            onClick={() => {
              handleButtonClick('Депозит');
            }}
          >
            Депозит
          </Button>
          <Button
            color={activeButton === 'Дохід' ? 'primary' : 'fourth'}
            sx={{
              backgroundColor: activeButton === 'Дохід' ? 'white' : '',
            }}
            onClick={() => {
              handleButtonClick('Дохід');
            }}
          >
            Дохід
          </Button>
          <Button
            color={activeButton === 'Витрати' ? 'primary' : 'fourth'}
            sx={{ backgroundColor: activeButton === 'Витрати' ? 'white' : '' }}
            onClick={() => {
              handleButtonClick('Витрати');
            }}
          >
            Витрати
          </Button>
        </Stack>
      </Container>
      <Box>
        <Box marginLeft='70px'>
          <Typography
            fontFamily={'Rowdies, sans-serif'}
            fontSize='27px'
            fontWeight={700}
            color={Colors.white}
          >
            {activeButton === 'Кредит' ? <Credit /> : null}
            {activeButton === 'Депозит' ? <DepoEdit /> : null}
            {activeButton === 'Дохід' ? <Income /> : null}
            {activeButton === 'Витрати' ? <Purchases /> : null}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default EditComponent;
