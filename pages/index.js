import { gql, useMutation } from '@apollo/client';
import client from './client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Button, Form } from 'react-bootstrap';

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Server {
        servers {
          name
          status
          cpu
          memory
          storage
          uptime
          location {
            name
          }
        }
      }
    `,
  });

  return {
    props: {
      servers: data.servers,
    },
  };
}
export default function Home({ servers }) {
  // const INCREMENT_COUNTER = gql`
  //   mutation {
  //     createServer(input: { name: "sentul", cpu: 1000, memory: 0.912, storage: 98989, uptime: 10000, status: ACTIVE, locationId: "62b295f8030f630033e8dcc9" }) {
  //       name
  //       status
  //       cpu
  //       memory
  //       storage
  //       uptime
  //       location {
  //         id
  //         name
  //       }
  //     }
  //   }
  // `;

  // const [mutateFunction, { data, loading, error }] = useMutation(INCREMENT_COUNTER);

  return (
    <Container>
      <h1 className="text-center">List Server</h1>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status: Active | Down</th>
            <th>CPU</th>
            <th>Memory</th>
            <th>Storage</th>
            <th>Uptime</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((item, key) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.status}</td>
              <td>{item.cpu}</td>
              <td>{item.memory}</td>
              <td>{item.storage}</td>
              <td>{item.uptime}</td>
              <td>{item.location.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control type="text" placeholder="EnterStatus" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>cpu</Form.Label>
          <Form.Control type="text" placeholder="Cpu" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>memory</Form.Label>
          <Form.Control type="text" placeholder="Memory" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>storage</Form.Label>
          <Form.Control type="text" placeholder="Storate" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>uptime</Form.Label>
          <Form.Control type="text" placeholder="Uptime" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
