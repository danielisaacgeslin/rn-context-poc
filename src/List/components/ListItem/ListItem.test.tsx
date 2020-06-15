import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import ListItem, { Props } from './ListItem';
import { getArtist_1 } from '../../../../test-helpers';

describe('ListItem', () => {
  let props: Props;
  beforeEach(() => {
    props = {
      artist: getArtist_1(),
      albumCount: 0,
      onPress: jest.fn()
    };
  });

  it('should render without an album count', () => {
    const { toJSON } = render(<ListItem {...props} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render with an album count', () => {
    const { toJSON } = render(<ListItem {...props} albumCount={5} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render without a thumb', () => {
    const { toJSON } = render(<ListItem {...props} artist={{ ...getArtist_1(), strArtistThumb: null }} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should callback on press', async () => {
    const { findByTestId } = render(<ListItem {...props} artist={{ ...getArtist_1(), strArtistThumb: null }} />);
    const item = await findByTestId('list-item');
    fireEvent.press(item);
    expect(props.onPress).toBeCalled();
  });
});
