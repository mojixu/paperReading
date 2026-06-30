# GRIP Insight

Interactive research reading portfolio for the paper **Retrieval as Generation: A Unified Framework with Self-Triggered Information Planning**.

## Streamlit Deployment

This repository now includes a Streamlit version for easier public deployment.

```bash
pip install -r requirements.txt
streamlit run streamlit_app.py
```

Open <http://127.0.0.1:8501>.

Streamlit Community Cloud settings:

- Repository: `mojixu/paperReading`
- Branch: `main`
- Main file path: `streamlit_app.py`
- Python version: `3.11`

## Next.js Version

The original portfolio version is still available.

```bash
npm install
npm run dev
```

Open <http://127.0.0.1:3000>.

## Validation

```bash
python -m py_compile streamlit_app.py
npm run lint
npm run build
```
