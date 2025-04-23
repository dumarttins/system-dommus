import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function AppPagination({ meta, onChange }) {
  const { current_page, last_page } = meta;
  const items = [];
  for (let number = 1; number <= last_page; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === current_page}
        onClick={() => onChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return <Pagination>{items}</Pagination>;
}
