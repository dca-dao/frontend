import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Metamask } from '../components/DCA/Metamask';
import { useEthers } from "@usedapp/core"

test('Checking if metamask opens', () => {

    // Check if button exists
    render(<Metamask />);
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument();
})
