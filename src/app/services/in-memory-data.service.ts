import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const speeches = [
      { id: 1, author: 'Author 1', title: 'Speech 1', content: 'Speech 1 content.', date: new Date('12/01/17'), keywords: ['test1', 'key1'] },
      { id: 2, author: 'Author 2', title: 'Speech 2', content: 'Speech 2 content.', date: new Date('12/02/17'), keywords: ['test2', 'key2'] },
      { id: 3, author: 'Author 3', title: 'Speech 3', content: 'Speech 3 content.', date: new Date('12/03/17'), keywords: ['test3', 'key3'] },
      { id: 4, author: 'Author 4', title: 'Speech 4', content: 'Speech 4 content.', date: new Date('12/04/17'), keywords: ['test4', 'key4'] },
      { id: 5, author: 'Author 5', title: 'Speech 5', content: 'Speech 5 content.', date: new Date('12/05/17'), keywords: ['test5', 'key5'] },
      { id: 6, author: 'Author 6', title: 'Speech 6', content: 'Speech 6 content.', date: new Date('12/06/17'), keywords: ['test6', 'key6'] },
      { id: 7, author: 'Author 7', title: 'Speech 7', content: 'Speech 7 content.', date: new Date('12/07/17'), keywords: ['test7', 'key7'] },
      { id: 8, author: 'Author 8', title: 'Speech 8', content: 'Speech 8 content.', date: new Date('12/08/17'), keywords: ['test8', 'key8'] },
      { id: 9, author: 'Author 9', title: 'Speech 9', content: 'Speech 9 content.', date: new Date('12/09/17'), keywords: ['test9', 'key9'] },
      { id: 10, author: 'Author 10', title: 'Speech 10', content: 'Speech 10 content.', date: new Date('12/10/17'), keywords: ['test0', 'key10'] },
    ]

    return { speeches };
  }

}
