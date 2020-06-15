import { css } from '@emotion/native';

export const styles = {
  container: css`
    padding: 10px 15px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    background: white;
    margin: 3px 0;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
  `,
  dataContainer: css`
    flex-direction: row;
    align-items: center;
  `,
  link: css`
    color: blue;
  `,
  image: css`
    margin-right: 10px;
    height: 25px;
    width: 25px;
  `,
  artistName: css`
    font-size: 13px;
    font-weight: bold;
  `,
  count: css`
    font-size: 10px;
  `
};
