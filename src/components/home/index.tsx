import { Button } from '@mui/material';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import apiService from '../../services/api-service';
import { ButtonContainer, Root } from './styles';

const Home: FC = () => {
  useEffect(() => {
    apiService.get('/dialogue');
  }, []);

  return (
    <Root>
      <ButtonContainer>
        <Link href="/assistant" >
          <Button variant="contained" color="primary">
            Acessar
          </Button>
        </Link>
      </ButtonContainer>
    </Root>
  );
}

export default Home;