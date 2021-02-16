import React from 'react';
import DataList from '../DataList'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import DataListFromApi from '../DataListFromApi';
import axiosMock from 'axios';
import "@testing-library/jest-dom";

const serverGretting = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there'}))
  })
);

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('cidades', () => {
    // respond using a mocked JSON body
    return Promise.resolve({
      data: [     
          {
            cidade: 'Senas',
            pais: 'Brazil'
          },
          {
            cidade: 'Fortal',
            pais: 'Brazil'
          }
      ]
    });
  })
)

beforeAll(() => server.listen())
afterEach(() => {
  axiosMock.get.mockClear();
});
//afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('descrição do teste', () => {  

    test('deve adicionar item e verificar se foi adicionado', async () => {
        
        const { getByTestId, getByText } = render(<DataList/>)
        const valueTesting = "caio"
        const fieldNode = await waitFor(
            () => getByTestId('form-field')
        )
       
        fireEvent.change(fieldNode, { target: { value: valueTesting } })
        console.log(fieldNode.value)
        expect(fieldNode.value).toEqual('caio')

        const btnNode = await waitFor(
            () => getByTestId('btn-form')
        )
        fireEvent.click(btnNode)

        const listNode = await waitFor(
            () => getByText(valueTesting)
        )
        expect(listNode).toBeDefined()
    })
    test('verifica Get', async () => {
      axiosMock.get.mockResolvedValueOnce({
        data: [     
          {
            cidade: 'Senas',
            pais: 'Brazil'
          },
          {
            cidade: 'Fortal',
            pais: 'Brazil'
          },
          {
            cidade: 'Quixas',
            pais: 'Brazil'
          }
        ]
      });
      const { getByTestId, getByText } = render(<DataListFromApi/>)
      await waitFor(() => {
        expect(screen.getByTestId('lista')).toHaveTextContent('Seninhas');
      })    
    })    
})

describe('Testando endpoints', () => {
   /*  test('verificação do get cidade', async () => {
        await act(async () => {
          const { getByTestId } = render(<DataListFromApi />);
          expect(getByTestId('form-field')).toBeInTheDocument();
        });
    });
 */
    /* test('loads and displays greeting', async () => {
      const url = '/greeting'
      render(<DataListFromApi url={url} />)

      fireEvent.click(screen.getByText('Load Greeting'))

      await waitFor(() => screen.getByRole('heading'))

      expect(screen.getByRole('heading')).toHaveTextContent('hello there')
      expect(screen.getByRole('button')).toHaveAttribute('disabled')
    }) */

    test('server error', async () => {
        server.use(
          // override the initial "GET /greeting" request handler
          // to return a 500 Server Error
          rest.get('cidades', (req, res, ctx) => {
            return res(ctx.status(500))          
          })
        )
    })
})
