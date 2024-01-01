import { IItem } from '@/models/item';
import { ICount } from '@/models/count';
import { IPoll } from '@/models/poll';
import { IListItem } from '@/models/list-item';

export class APIService {
  public getPollCount = async (item: IItem, pollName: string): Promise<ICount[]> =>
    (await (await fetch(`/api/poll/${pollName}/${item.id}?type=count`)).json()).filter(
      (p: ICount) => item.options.includes(p.Value)
    );

  public getPollList = async (pollName: string): Promise<IListItem[]> => {
    const res = await (await fetch(`/api/poll/${pollName}?type=list`)).json();
    return res.results;
  };

  public addPoll = (poll: IPoll): Promise<Response> =>
    fetch(`/api/poll/${poll.pollName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(poll)
    });
}
