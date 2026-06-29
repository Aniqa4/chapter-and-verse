import Title from '../../Components/Title';
import { Link } from 'react-router-dom';
import Publications from '../../Hooks/Publications';

function Publishers() {
  const [publications] = Publications();

  return (
    <div className="lg:container lg:mx-auto py-5 mx-5">
      <Title title="Publishers" />
      <p className="py-2 text-gray-400 text-sm">Browse books by publisher</p>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-4 mt-2">
        {publications?.map(x => (
          <Link
            key={x?._id}
            to={`${x?.name}`}
            className="p-5 bg-white shadow-sm border border-gray-100 rounded-lg hover:shadow-md hover:border-green-200 transition-all group"
          >
            <h1 className="font-semibold text-gray-800 group-hover:text-green-700 transition-colors text-sm">{x.name}</h1>
            {x.description && (
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{x.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Publishers;
