// __tests__/fetch.test.js
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GroupsTable from '../../../Components/group/groupsTable';
import { MemoryRouter } from 'react-router-dom';

const server = setupServer(
  rest.get('/grupos-investigacion', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Testing in <GroupsTable/>', () => {
  test('should display a table with a title', () => {
    render(
      <MemoryRouter>
        <GroupsTable data={[{ id: 1, name: 'grupo test' }]} isLoading />
      </MemoryRouter>
    );

    // console.log(screen.getAllByRole('heading')[0]);
    expect(screen.getAllByRole('heading', { level: 6 })[0]).toHaveTextContent(
      'Lista de grupos de investigación '
    );
  });
});
