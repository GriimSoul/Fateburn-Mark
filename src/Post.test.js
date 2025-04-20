import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Post from './Main-Area/Post/Post';

const mockStore = configureStore([]);

const samplePost = {
  score: 10,
  url_overridden_by_dest: 'https://example.com/image.jpg',
  is_gallery: false,
  media_metadata: {},
  author: 'test_author',
  subreddit: 'test_subreddit',
  created_utc: Date.now() / 1000,
  num_comments: 5,
  permalink: '/r/test_subreddit/comments/12345/test_post',
  title: 'Test Post Title',
  selftext: 'Test post content',
};

describe('Post component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      subList: { subBackUp: [] },
      posts: { inPost: false },
      comments: { themProfiles: [] },
    });
  });

  test('renders post title and author', () => {
    render(
      <Provider store={store}>
        <Post information={samplePost} />
      </Provider>
    );
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('test_author')).toBeInTheDocument();
  });

  test('upvote and downvote buttons update score', () => {
    render(
      <Provider store={store}>
        <Post information={samplePost} />
      </Provider>
    );
    const upvoteButton = screen.getByAltText('Upvote');
    const downvoteButton = screen.getByAltText('Downvote');
    const scoreDisplay = screen.getByText('10');

    // Click upvote
    fireEvent.click(upvoteButton);
    expect(scoreDisplay.textContent).toBe('11');

    // Click downvote
    fireEvent.click(downvoteButton);
    expect(scoreDisplay.textContent).toBe('9');
  });

  test('clicking post title dispatches enterPost action when not inPost', () => {
    store = mockStore({
      subList: { subBackUp: [] },
      posts: { inPost: false },
      comments: { themProfiles: [] },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Post information={samplePost} />
      </Provider>
    );

    const titleElement = screen.getByText('Test Post Title');
    fireEvent.click(titleElement);

    expect(store.dispatch).toHaveBeenCalled();
  });

  test('renders image when url is image', () => {
    render(
      <Provider store={store}>
        <Post information={samplePost} />
      </Provider>
    );
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', samplePost.url_overridden_by_dest);
  });
});
