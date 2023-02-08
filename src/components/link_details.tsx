import { ILink } from "../data/link.interface";

const LinkDetails = ({ link }: { link: ILink }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>id</th>
            <td>{link.id}</td>
          </tr>
          <tr>
            <th>scheme</th>
            <td>{link.scheme}</td>
          </tr>
          <tr>
            <th>shorted path id</th>
            <td>{link.raw_shortened_path_id}</td>
          </tr>
          <tr>
            <th>root</th>
            <td>{link.root}</td>
          </tr>
          <tr>
            <th>shortened path</th>
            <td>{link.shortened_path}</td>
          </tr>
          <tr>
            <th>shortened uri</th>
            <td>{link.shortened_uri}</td>
          </tr>
          <tr>
            <th>uri</th>
            <td>{link.uri}</td>
          </tr>
          <tr>
            <th>count</th>
            <td>{link.count}</td>
          </tr>
          <tr>
            <th>created date</th>
            <td>{link.created_date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LinkDetails;
