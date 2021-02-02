import React from 'react';
import DataList from '../DataList'
import { fireEvent, render, waitFor } from '@testing-library/react'

describe('descrição do teste', () => {
    test('deve adicionar item e verificar se foi adicionado', async () => {
        
        const { getByTestId, getByText } = render(<DataList/>)
        const valueTesting = "caio"
        const fieldNode = await waitFor(
            () => getByTestId('form-field')
        )
       
        fireEvent.change(fieldNode, { target: { value: valueTesting } })
        console.log(fieldNode.value)
        expect(fieldNode.value).toEqual('teste')

        const btnNode = await waitFor(
            () => getByTestId('btn-form')
        )
        fireEvent.click(btnNode)

        const listNode = await waitFor(
            () => getByText(valueTesting)
        )
        expect(listNode).toBeDefined()
    })
})