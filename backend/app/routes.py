from flask import Blueprint, jsonify
from scholarly import scholarly 
from openai import OpenAI
import os 
import logging

main = Blueprint('main', __name__)
client = OpenAI(api_key = os.getenv('OPENAI_API_KEY'))

@main.route('/')

def index():
    return jsonify({"message": "Welcome to Scholar API"})

@main.route('/api/scholar/<author_name>')

# ransalusenanayake
# yezhouyang

def get_scholar_data(author_name):
    try:
        
        search_query = scholarly.search_author(author_name)
        # getting the first author result and filling it. 
        author = scholarly.fill(next(search_query))
        
        logging.debug(f"Author object : {author}")
        
       # getting the publications 
        publications = []        
        citation_count = []
        
        # if 'publications' in author and isinstance(author['publications'],list):
        #     for pub in author['publications']:
        #         if 'bib' in pub and 'title' in pub['bib']:
        #             publications.append(pub['bib']['title'])
        
        if 'publications' in author and isinstance(author['publications'], list):
            for pub in author['publications']:
                if 'bib' in pub:
                    title = pub['bib'].get('title', 'Unknown Title')
                    citations = pub.get('num_citations', 0)  # Citation count
                    
                    publications.append(title)
                    citation_count.append(citations)  
            
        # print(publications)
        
        # updated call 
        analysis = client.chat.completions.create(
            # model="gpt-3.5-turbo",
            model = "gpt-4o",
            messages=[
                {"role": "system", "content": "Analyze these research publications"},
                {"role": "user", "content": f"Analyze these publications: {publications}"}
            ]
        )
        author_data = {
                'name': author.get('name'),
                'affiliation': author.get('affiliation'),
                'interests': author.get('interests', []),
                'citations': author.get('citedby', 0),
                'publications': [
                    {'title': pub, 'citations': count}
                    for pub, count in zip(publications, citation_count)
                ]
            }


        return jsonify({
            'author': author_data,
            'analysis': analysis.choices[0].message.content,
            'citation_counts': citation_count 
        })

    except StopIteration:
        return jsonify({'error': 'Author not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

